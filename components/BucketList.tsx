'use client'

import { useEffect, useState } from 'react'
import { getBucketListItems, addBucketListItem } from '@/lib/bucketApi'

type BucketItem = {
  id: string
  title: string
  created_at: string
}

export default function BucketList({ coupleId }: { coupleId: string }) {
  const [items, setItems] = useState<BucketItem[]>([])
  const [newTitle, setNewTitle] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!coupleId) return
    setLoading(true)
    getBucketListItems(coupleId)
      .then(setItems)
      .finally(() => setLoading(false))
  }, [coupleId])

  const handleAdd = async () => {
    if (!newTitle) return
    const added = await addBucketListItem(coupleId, newTitle)
    setItems(prev => [added[0], ...prev])
    setNewTitle('')
  }

  return (
    <div className="p-4 bg-zinc-800 rounded-lg shadow text-white">
      <h2 className="text-2xl font-semibold mb-4">Your Bucket List</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="p-2 flex-1 rounded bg-zinc-700 text-white"
          placeholder="Add something new..."
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-purple-600 px-4 py-2 rounded text-white hover:bg-purple-700"
        >
          Add
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>No items yet!</p>
      ) : (
        <ul className="space-y-2">
          {items.map(item => (
            <li
              key={item.id}
              className="p-3 rounded bg-zinc-700 flex justify-between items-center"
            >
              <span>{item.title}</span>
              <span className="text-sm text-zinc-400">
                {new Date(item.created_at).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
