import { Loader2Icon } from 'lucide-react';

const Loading = () => {
	return (
		<section className="flex h-screen w-full items-center justify-center">
			<Loader2Icon className="text-secondary size-36 animate-spin" />
		</section>
	);
};

export default Loading;
