import JohnTrevoltaGif from '@/assets/giphy.gif';

export function Empty() {
  return (
    <div className="flex justify-center">
      <img src={JohnTrevoltaGif} className="flex-1 h-auto" alt="it is empty" />
    </div>
  );
}
