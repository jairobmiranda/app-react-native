/* 

# Reexport centralizado
  Coloque aqui todos os tipos que você deseja exportar de forma centralizada
  (Types que são usados em várias partes do projeto).

  Assim, em vez de fazer isso:
  import { User } from '../types/models/User';

  Você pode simplesmente fazer:
  import { User } from '../types';

*/
export * from './models/User';
