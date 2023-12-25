import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { loadTags } from '../api';
import { Loader } from 'lucide-react';
import { useAppDispatch } from '@/hooks';
import { setCurrentTab } from '@/features/feed/stores/feed.reducer';

export function PopularTagsList() {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTags();
  }, []);

  async function getTags() {
    setLoading(true);
    try {
      const tags = await loadTags();
      if (tags) {
        setTags(tags);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="xl:w-[250px] flex items-center justify-center">
        <Loader className="h-4 w-4 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-4 p-2">
      <p className="text-base font-semibold">Popular Tags</p>
      <div className="xl:w-[250px] self-start flex gap-2 flex-wrap">
        {tags.map((x, i) => (
          <Badge
            className="hover:cursor-pointer"
            key={i}
            variant={'outline'}
            onClick={() => dispatch(setCurrentTab(x))}
          >
            {x}
          </Badge>
        ))}
      </div>
    </section>
  );
}
