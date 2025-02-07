import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const getEmoji = (emotion: string) => {
  const emojiMap: { [key: string]: string } = {
    happy: "😊",
    sad: "😢",
    angry: "😠",
    excited: "🎉",
    tired: "😴",
    anxious: "😰",
    peaceful: "😌",
    // Add more mappings as needed
  }
  return emojiMap[emotion.toLowerCase()] || "🤔"
}

export default async function ResponseList() {
  const { data: responses } = await supabase
    .from('responses')
    .select()
    .order('created_at', { ascending: false })
    .limit(10)

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Recent Moods</h2>
      <div className="space-y-3">
        {responses?.map((response) => (
          <div 
            key={response.id} 
            className="flex items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg"
          >
            <span className="text-2xl mr-3">{getEmoji(response.emotion)}</span>
            <div>
              <p className="font-medium text-gray-800 capitalize">{response.emotion}</p>
              <p className="text-sm text-gray-500">
                {new Date(response.created_at).toLocaleDateString('en-US', {
                  weekday: 'long',
                  hour: 'numeric',
                  minute: 'numeric'
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

