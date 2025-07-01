import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div className="flex flex-col items-center justify-center px-8 text-center">
			<h1 className="text-destructive mb-4 text-5xl font-bold">
				404: Memory Not Found
			</h1>
			<p className="mb-6 text-lg italic">
				You’ve stumbled into a forgotten corridor of the mind. <br />
				There’s nothing here… or is there?
			</p>
			<img
				src="https://videos.openai.com/vg-assets/assets%2Ftask_01jyhz8403eyfs72h2k46z5rrm%2F1750802469_img_0.webp?st=2025-06-24T20%3A56%3A02Z&se=2025-06-30T21%3A56%3A02Z&sks=b&skt=2025-06-24T20%3A56%3A02Z&ske=2025-06-30T21%3A56%3A02Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=XS%2FGZUPPbkuGOfmhrVNZIncM4S3ZGqScsnyN4d21tOM%3D&az=oaivgprodscus"
				alt="Surreal Relativity"
				className="mb-6 max-h-[1000px] max-w-full rounded-md"
			/>
			<Link
				to="/"
				className="text-secondary hover:text-primary text-xl underline underline-offset-4 transition-all duration-300 ease-in-out hover:font-bold">
				Return to the realm of the known
			</Link>
		</div>
	);
};

export default NotFound;
