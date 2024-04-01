export interface Participants {
  numEmp: number
  tipCol: number
  numCad: number
  nomFun: string
  numCpf: string
  fotCol: string
}

export interface Training {
  codCua: number
  nomCua: string
  tmaCua: number
  datIni: string
  datFim: string
  participantes: Participants[]
}
