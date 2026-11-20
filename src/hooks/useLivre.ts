import {obtenirLivre} from '../api/livres'
import { useQuery } from '@tanstack/react-query';

export function useLivre( id:number){
    return useQuery({
    queryKey:['livres', id],
    queryFn: ({signal}) => obtenirLivre(id, signal),
    retry: false,
});
}