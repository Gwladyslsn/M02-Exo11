import { EnTete } from './EnTete';
import { PiedDePage } from './PiedDePage';
import { Outlet } from 'react-router';

export function Racine() {

    return (
        <>
            <EnTete  />
            <main className='page'>
                <Outlet/>
            </main>
            <PiedDePage/>
        </>
    )
}