import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSubscription } from '@apollo/react-hooks'

import { DashboardTile, Text, Loader } from '@dailykit/ui'

// State
import { useTabs } from '../../context'

import { StyledHome, StyledCardList } from './styled'

import { STATIONS_AGGREGATE, USERS_AGGREGATE } from '../../graphql'

const address = 'apps.settings.views.home.'

const Home = () => {
   const { addTab } = useTabs()
   const { t } = useTranslation()
   const {
      loading: stationsLoading,
      error: stationsError,
      data: { stationsAggregate = {} } = {},
   } = useSubscription(STATIONS_AGGREGATE)
   const {
      loading: usersLoading,
      error: usersError,
      data: { settings_user_aggregate = {} } = {},
   } = useSubscription(USERS_AGGREGATE)

   if (stationsLoading || usersLoading) return <Loader />
   if (stationsError) return <div>{stationsError}</div>
   if (usersError) return <div>{usersError}</div>
   return (
      <StyledHome>
         <Text as="h1">{t(address.concat('settings app'))}</Text>
         <StyledCardList>
            <DashboardTile
               title={t(address.concat('users'))}
               count={settings_user_aggregate.aggregate.count}
               conf="All available"
               onClick={() => addTab('Users', '/settings/users')}
            />
            <DashboardTile
               title={t(address.concat('devices'))}
               count="4"
               conf="All active"
               onClick={() => addTab('Devices', '/settings/devices')}
            />
            <DashboardTile
               title={t(address.concat('stations'))}
               count={stationsAggregate.aggregate.count}
               conf="All active"
               onClick={() => addTab('Stations', '/settings/stations')}
            />
            <DashboardTile
               title={t(address.concat('master lists'))}
               count="5"
               conf="All active"
               onClick={() => addTab('Master Lists', '/settings/master-lists')}
            />
         </StyledCardList>
      </StyledHome>
   )
}

export default Home
