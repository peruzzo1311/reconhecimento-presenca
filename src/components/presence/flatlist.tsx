import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native'

import PresenceDialog from './dialog'
import PresenceItem from './item'

import { usePresenceDialogStore } from '@/store/presence-dialog'
import { Participants } from '@/types'

interface PresenceFlatListProps {
  participants: Participants[]
}

export default function PresenceFlatList({
  participants,
}: PresenceFlatListProps) {
  const navigation: any = useNavigation()
  const { openDialog, setOpenDialog, participant, setParticipant } =
    usePresenceDialogStore()

  return (
    <>
      <FlatList
        data={participants}
        keyExtractor={(item) => item.numCpf.toString()}
        renderItem={({ item }) => (
          <PresenceItem
            participant={item}
            setOpenPresenceDialog={setOpenDialog}
            setParticipant={setParticipant}
          />
        )}
      />

      <PresenceDialog
        open={openDialog}
        onClose={setOpenDialog}
        navigation={navigation}
        participant={participant}
      />
    </>
  )
}
