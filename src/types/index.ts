export interface Participants {
  numEmp: number
  tipCol: number
  numCad: number
  nomFun: string
  numCpf: string
  fotCol: string
  isPresent?: boolean
}

export interface Training {
  codCua: number
  nomCua: string
  tmaCua: number
  datIni: string
  datFim: string
  participantes: Participants[]
}

export interface ResponseDefault {
  codRet: number
  msgRet: string
}
