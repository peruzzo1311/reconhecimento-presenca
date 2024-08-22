export interface Participant {
  numEmp: number
  tipCol: number
  numCad: number
  nomFun: string
  numCpf: string | number
  fotCol: string
  staFre: 'Ausente' | 'Presente' | 'Sincronizar'
}

export interface Training {
  codCua: number
  nomCua: string
  tmaCua: number
  datIni: string
  datFim: string
  participantes: Participant[]
}

export interface ResponseDefault {
  codRet: number
  msgRet: string
}

export interface ParticipantePresence {
  numEmp: number
  tipCol: number
  numCad: number
  datFre: string
  horFre: string
  nomFun: string
  fotCol?: string
}

export interface Presence {
  codCua: number
  tmaCua: number
  participantes: ParticipantePresence[]
}
