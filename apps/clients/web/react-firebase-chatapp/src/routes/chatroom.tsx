import ChatRoomPage from '@/pages/ChatRoomPage'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { waitForAuthState } from '@/services/auth.service'

export const Route = createFileRoute('/chatroom')({
  beforeLoad: async () => {
    const user = await waitForAuthState()

    if (!user) {
      throw redirect({ to: '/login' })
    }
  },
  component: ChatRoomPage,
})

