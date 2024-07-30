export interface Participant {
  numEmp: number
  tipCol: number
  numCad: number
  nomFun: string
  numCpf: string | number
  fotCol: string
  staFre: 'Ausente' | 'Presente'
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
