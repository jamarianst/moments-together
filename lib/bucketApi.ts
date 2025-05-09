import { supabase } from '@/lib/supabaseClient'
import { getBucketListItems } from '@/lib/bucketApi'


// Get all bucket list items for a couple
export async function getBucketListItems(coupleId: string) {
  const { data, error } = await supabase
    .from('bucket_list_items')
    .select('*')
    .eq('couple_id', coupleId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Add a new bucket list item
export async function addBucketListItem(
  coupleId: string,
  title: string,
  category?: string
) {
  const { data, error } = await supabase
    .from('bucket_list_items')
    .insert([{ couple_id: coupleId, title, category }])

  if (error) throw error
  return data
}

// Update status of a bucket list item
export async function updateBucketItemStatus(
  itemId: string,
  status: 'planned' | 'in_progress' | 'done'
) {
  const { data, error } = await supabase
    .from('bucket_list_items')
    .update({ status })
    .eq('id', itemId)

  if (error) throw error
  return data
}
