
export class TipoConta {
    id: number;
    nome: string;
    CONTA_CORRENTE = 1;
    CONTA_POUPANCA = 2;
    CONTA_SALARIO = 3;

    public getTipoContas(){
      return([
        {'id': this.CONTA_CORRENTE, 'nome':'Conta Corrente'},
        {'id': this.CONTA_POUPANCA, 'nome':'Conta Poupança'},
        {'id': this.CONTA_SALARIO, 'nome':'Conta Salário'}
      ])
    }
  }