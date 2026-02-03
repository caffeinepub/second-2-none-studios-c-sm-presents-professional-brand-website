import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type {
  UserProfile,
  Publication,
  Product,
  ShoppingItem,
  StripeConfiguration,
  TrainingVideo,
  TrainingDocument,
} from '../backend';

// ===== User Profile =====
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// ===== Biography & Contact =====
export function useGetBiographyContent() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['biographyContent'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getBiographyContent();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetContactInfo() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['contactInfo'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getContactInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

// ===== Appointments =====
export function useCheckBookingAccess() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['bookingAccess'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.checkBookingAccess();
    },
    enabled: !!actor && !isFetching,
  });
}

// ===== Store Access =====
export function useCheckStoreAccess() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['storeAccess'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.checkStoreAccess();
    },
    enabled: !!actor && !isFetching,
  });
}

// ===== Apparel Items =====
export function useGetApparelItems() {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['apparelItems'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllApparel();
    },
    enabled: !!actor && !isFetching,
  });
}

// ===== Publications =====
export function useGetPublications() {
  const { actor, isFetching } = useActor();

  return useQuery<Publication[]>({
    queryKey: ['publications'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getPublications();
    },
    enabled: !!actor && !isFetching,
  });
}

// ===== Training Videos =====
export function useGetTrainingVideos() {
  const { actor, isFetching } = useActor();

  return useQuery<TrainingVideo[]>({
    queryKey: ['trainingVideos'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getTrainingVideos();
    },
    enabled: !!actor && !isFetching,
  });
}

// ===== Training Documents =====
export function useGetTrainingDocuments() {
  const { actor, isFetching } = useActor();

  return useQuery<TrainingDocument[]>({
    queryKey: ['trainingDocuments'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getTrainingDocuments();
    },
    enabled: !!actor && !isFetching,
  });
}

// ===== Video Access =====
export function useCheckVideoAccess() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['videoAccess'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.checkVideoAccess();
    },
    enabled: !!actor && !isFetching,
  });
}

// ===== Stripe =====
export function useIsStripeConfigured() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['stripeConfigured'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.isStripeConfigured();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateCheckoutSession() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      items,
      successUrl,
      cancelUrl,
    }: {
      items: ShoppingItem[];
      successUrl: string;
      cancelUrl: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      const result = await actor.createCheckoutSession(items, successUrl, cancelUrl);
      return JSON.parse(result) as { id: string; url: string };
    },
  });
}

export function useSetStripeConfiguration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: StripeConfiguration) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setStripeConfiguration(config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stripeConfigured'] });
    },
  });
}

// ===== Membership =====
export function useGetMembershipPlans() {
  const { actor, isFetching } = useActor();

  return useQuery<ShoppingItem[]>({
    queryKey: ['membershipPlans'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getMembershipPlans();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePurchaseMembership() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      plan,
      successUrl,
      cancelUrl,
    }: {
      plan: ShoppingItem;
      successUrl: string;
      cancelUrl: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      const result = await actor.purchaseMembership(plan, successUrl, cancelUrl);
      return JSON.parse(result) as { id: string; url: string };
    },
  });
}

export function useIsUserMember() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isUserMember'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isUserMember();
    },
    enabled: !!actor && !isFetching,
  });
}

// ===== Admin Check =====
export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
