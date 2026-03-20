import type { MassageDeskPlanId } from './massagedeskosAccess';
import { supabase } from './supabase';

export interface BuyerEntitlement {
  id: string;
  sale_id: string;
  buyer_email: string;
  plan_id: MassageDeskPlanId;
  status: 'active' | 'revoked' | 'pending';
  portal_url: string;
  access_granted_at: string;
  access_expires_at: string | null;
}

export function isEntitlementActive(entitlement: BuyerEntitlement | null) {
  if (!entitlement) return false;
  if (entitlement.status !== 'active') return false;
  if (!entitlement.access_expires_at) return true;
  return new Date(entitlement.access_expires_at).getTime() > Date.now();
}

export async function fetchBuyerEntitlementByEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return null;

  const { data, error } = await supabase
    .from('massagedeskos_buyer_entitlements')
    .select('id, sale_id, buyer_email, plan_id, status, portal_url, access_granted_at, access_expires_at')
    .eq('buyer_email', normalized)
    .order('access_granted_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return (data as BuyerEntitlement | null) ?? null;
}

export async function fetchCurrentBuyerEntitlement() {
  const { data: userResult, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;

  const email = userResult.user?.email?.toLowerCase();
  if (!email) return null;

  return fetchBuyerEntitlementByEmail(email);
}
