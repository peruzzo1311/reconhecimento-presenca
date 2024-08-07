export interface Participant {
  numEmp: number
  tipCol: number
  numCad: number
  nomFun: string
  numCpf: string | number
  fotCol: string
  staFre: 'Ausente' | 'Presente' | 'Sincronizar'
  isSelected?: boolean
}

export interface Training {
  codCua: number
  nomCua: string
  tmaCua: number
  datIni: string
  datFim: string
  isSelected?: boolean
  participantes?: Participant[]
}

export interface ResponseDefault {
  codRet: number
  msgRet: string
}
