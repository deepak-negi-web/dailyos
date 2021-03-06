import React from 'react'
import { useSubscription } from '@apollo/react-hooks'
import { Loader, Tunnel, Tunnels, useTunnel, TunnelHeader } from '@dailykit/ui'

import { useTabs } from '../../context'
import { NOTIFICATIONS } from '../../graphql'
import { Notifs, Notif, Main } from './styled'

export const Notifications = ({ isOpen, closePortal }) => {
   const { addTab } = useTabs()
   const {
      error,
      loading,
      data: { displayNotifications: notifications = [] } = {},
   } = useSubscription(NOTIFICATIONS)
   const [tunnels, openTunnel, closeTunnel] = useTunnel(1)

   React.useEffect(() => {
      if (isOpen) {
         openTunnel(1)
      } else {
         closeTunnel(1)
      }
   }, [isOpen])

   const createTab = (e, notif) => {
      const index = notif?.content?.action?.url.lastIndexOf('/') + 1
      const id = notif?.content?.action?.url.slice(index)
      addTab(`ORD${id}`, notif.content.action.url)
      closePortal(e)
   }

   return (
      <Tunnels tunnels={tunnels}>
         <Tunnel layer={1} size="sm">
            <TunnelHeader title="Notifications" close={closePortal} />
            <Main>
               {loading && <Loader />}
               {error && <div>{error.message}</div>}
               {notifications.length > 0 && (
                  <Notifs>
                     {notifications.map(notif => (
                        <Notif
                           key={notif.id}
                           onClick={e => createTab(e, notif)}
                        >
                           <h3>{notif?.content?.title}</h3>
                           <time>
                              {new Intl.DateTimeFormat('en-US', {
                                 minute: 'numeric',
                                 hour: 'numeric',
                                 month: 'short',
                                 day: 'numeric',
                              }).format(new Date(notif?.created_at))}
                           </time>
                           <p>{notif?.content?.description}</p>
                        </Notif>
                     ))}
                  </Notifs>
               )}
            </Main>
         </Tunnel>
      </Tunnels>
   )
}
