import { Empty } from '@/components/ui/empty';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {

   return (
    <div className='h-screen flex flex-col items-center gap-3 justify-center'>
        <h1 className='text-xl'>Oops, we couldn't find what you are looking for</h1>
        <section className='w-1/2'>
                <Empty />
        </section>
        <Link to={`/`} replace className='hover:underline p-2 font-semibold'>
            Come back home
        </Link>
    </div>
   )
    
}
