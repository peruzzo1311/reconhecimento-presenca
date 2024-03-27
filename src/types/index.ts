export interface Participantes {
  numEmp: number
  tipCol: number
  numCad: number
  nomFun: string
  numCpf: string
  fotCol: string
}

export interface Treinamento {
  codCua: number
  nomCua: string
  tmaCua: number
  datIni: string
  datFim: string
  participantes: Participantes[]
}
