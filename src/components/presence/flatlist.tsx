import { FlatList } from 'react-native'

import PresenceItem from './item'

import { Participants } from '@/types'

interface PresenceFlatListProps {
  participants: Participants[]
}

export default function PresenceFlatList({
  participants,
}: PresenceFlatListProps) {
  return (
    <FlatList
      data={participants}
      keyExtractor={(item) => item.numCpf.toString()}
      renderItem={({ item }) => <PresenceItem participant={item} />}
    />
  )
}
