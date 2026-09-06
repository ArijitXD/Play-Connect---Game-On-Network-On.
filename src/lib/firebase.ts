import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  deleteDoc,
  getDocFromServer,
  onSnapshot
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { SportsSession, UserProfile, RoadmapItem, SessionRsvp } from '../types';
import { INITIAL_SESSIONS, INITIAL_ROADMAP, DEMO_PERSONAS } from './mockData';

// Initialize Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Use specified custom firestoreDatabaseId if configured
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export const googleProvider = new GoogleAuthProvider();

// Connection testing required by Firebase skill
export async function testFirebaseConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase connection verified.');
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or starting up.');
    } else {
      console.info('Firebase initialized.');
    }
    return false;
  }
}

// Initialize seed data in Firestore if empty
export async function seedInitialFirestoreData() {
  try {
    // Check if sessions exist
    const sessionsCol = collection(db, 'sessions');
    const snapshot = await getDocs(sessionsCol);
    if (snapshot.empty) {
      console.log('Seeding initial sessions to Firestore...');
      for (const session of INITIAL_SESSIONS) {
        await setDoc(doc(db, 'sessions', session.id), session);
      }
    }

    // Check if roadmap items exist
    const roadmapsCol = collection(db, 'roadmaps');
    const rSnapshot = await getDocs(roadmapsCol);
    if (rSnapshot.empty) {
      console.log('Seeding initial roadmap to Firestore...');
      for (const item of INITIAL_ROADMAP) {
        await setDoc(doc(db, 'roadmaps', item.id), item);
      }
    }
  } catch (err) {
    console.warn('Firestore seeding notice (using local data fallback if restricted):', err);
  }
}

// User Profile Operations
export async function fetchUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
  } catch (e) {
    console.warn('Failed to fetch from Firestore, checking local storage:', e);
  }
  // Check localStorage
  const saved = localStorage.getItem(`profile_${uid}`);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // ignore
    }
  }
  return null;
}

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  try {
    await setDoc(doc(db, 'users', profile.uid), profile, { merge: true });
  } catch (e) {
    console.warn('Saved profile locally:', e);
  }
  localStorage.setItem(`profile_${profile.uid}`, JSON.stringify(profile));
}

// Sessions Operations
export async function fetchAllSessions(): Promise<SportsSession[]> {
  try {
    const snapshot = await getDocs(collection(db, 'sessions'));
    if (!snapshot.empty) {
      const items: SportsSession[] = [];
      snapshot.forEach((d) => items.push(d.data() as SportsSession));
      return items;
    }
  } catch (e) {
    console.warn('Using initial sessions fallback:', e);
  }
  // Local fallback
  const localSaved = localStorage.getItem('urban_sessions');
  if (localSaved) {
    try {
      return JSON.parse(localSaved);
    } catch {
      // ignore
    }
  }
  return INITIAL_SESSIONS;
}

export async function createSportsSession(session: SportsSession): Promise<void> {
  try {
    await setDoc(doc(db, 'sessions', session.id), session);
  } catch (e) {
    console.warn('Saved session locally:', e);
  }
  // Update local copy
  const localSaved = localStorage.getItem('urban_sessions');
  const existing: SportsSession[] = localSaved ? JSON.parse(localSaved) : INITIAL_SESSIONS;
  const updated = [session, ...existing.filter((s) => s.id !== session.id)];
  localStorage.setItem('urban_sessions', JSON.stringify(updated));
}

export async function rsvpToSession(
  session: SportsSession,
  user: UserProfile
): Promise<SportsSession> {
  const isAlreadyJoined = session.participants.some((p) => p.uid === user.uid);
  let updatedParticipants = [...session.participants];

  if (isAlreadyJoined) {
    // Un-join
    updatedParticipants = updatedParticipants.filter((p) => p.uid !== user.uid);
  } else {
    // Join
    if (updatedParticipants.length >= session.maxParticipants) {
      throw new Error('Session is already full');
    }
    updatedParticipants.push({
      uid: user.uid,
      displayName: user.displayName,
      role: user.role,
      company: user.companyOrSchool
    });
  }

  const updatedSession: SportsSession = {
    ...session,
    participants: updatedParticipants,
    status: updatedParticipants.length >= session.maxParticipants ? 'Full' : 'Open'
  };

  try {
    await setDoc(doc(db, 'sessions', session.id), updatedSession, { merge: true });
    // Also save RSVP in subcollection
    const rsvpRef = doc(db, 'sessions', session.id, 'rsvps', user.uid);
    if (isAlreadyJoined) {
      await deleteDoc(rsvpRef);
    } else {
      await setDoc(rsvpRef, {
        id: user.uid,
        sessionId: session.id,
        userId: user.uid,
        userName: user.displayName,
        userRole: user.role,
        status: 'Confirmed',
        skillLevel: user.skillRatings[session.sport] || 'Intermediate',
        createdAt: new Date().toISOString()
      });
    }
  } catch (e) {
    console.warn('Syncing RSVP locally:', e);
  }

  // Update local storage
  const localSaved = localStorage.getItem('urban_sessions');
  const existing: SportsSession[] = localSaved ? JSON.parse(localSaved) : INITIAL_SESSIONS;
  const newSessions = existing.map((s) => (s.id === session.id ? updatedSession : s));
  localStorage.setItem('urban_sessions', JSON.stringify(newSessions));

  return updatedSession;
}

// Roadmap Operations
export async function fetchAllRoadmaps(): Promise<RoadmapItem[]> {
  try {
    const snapshot = await getDocs(collection(db, 'roadmaps'));
    if (!snapshot.empty) {
      const items: RoadmapItem[] = [];
      snapshot.forEach((d) => items.push(d.data() as RoadmapItem));
      return items.sort((a, b) => b.votes - a.votes);
    }
  } catch (e) {
    console.warn('Using initial roadmap fallback:', e);
  }
  const localSaved = localStorage.getItem('urban_roadmaps');
  if (localSaved) {
    try {
      return JSON.parse(localSaved);
    } catch {
      // ignore
    }
  }
  return INITIAL_ROADMAP;
}

export async function voteRoadmap(itemId: string, userId: string): Promise<RoadmapItem[]> {
  const current = await fetchAllRoadmaps();
  const updated = current.map((item) => {
    if (item.id === itemId) {
      const hasVoted = item.upvotedBy.includes(userId);
      const newUpvotedBy = hasVoted
        ? item.upvotedBy.filter((u) => u !== userId)
        : [...item.upvotedBy, userId];
      const newVotes = hasVoted ? item.votes - 1 : item.votes + 1;
      const updatedItem = { ...item, votes: newVotes, upvotedBy: newUpvotedBy };
      // update in firestore
      setDoc(doc(db, 'roadmaps', itemId), updatedItem, { merge: true }).catch(() => {});
      return updatedItem;
    }
    return item;
  });

  localStorage.setItem('urban_roadmaps', JSON.stringify(updated));
  return updated;
}
