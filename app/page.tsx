import Image from "next/image";

// src/app/page.tsx
export default function Home() {
	return (
		<div className="prose prose-invert max-w-none m-10">
			<div>
				<h1>A developer who provides a banner to the world.</h1>
			</div>
			<div
				className="flex flex-row
			">
				<div className="mr-10">
					<Image
						src={"/imgs/profile.jpg"}
						width={200}
						height={0}
						alt="profile"
					/>
				</div>
				<div>
					<h2>Jeseok Lee</h2>
					<p>
						Hello there 👋
						<br />
						I&rsquo;m <b>Jeseok Lee</b> from south Korea
					</p>
					2006. 08. 03 / 이제석 <br />
					realjaylee83@gmail.com
					<br />
					Gwangju-si, Gyeonggi, South Korea
				</div>
			</div>
		</div>
	);
}
