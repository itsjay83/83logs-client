import Image from "next/image";
// src/app/page.tsx
export default function Home() {
	return (
		<div className="prose prose-invert max-w-none m-10">
			<div>
				<h1>A developer who provides value to the world.</h1>
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

			<div>
				<h2>About Me</h2>
				<p>
					I define myself as someone who provides value to the world. My
					ultimate goal is to develop services that improve people's quality of
					life and solve real-world problems. I believe technology should be a
					tool for creating meaningful change, not just writing code.
				</p>
				<p>
					Through my development journey, I aim to identify the challenges
					people face in their daily lives and create solutions that make their
					experiences more convenient, efficient, and fulfilling.
				</p>
			</div>

			<div>
				<h2>Education</h2>
				<ul>
					<li>
						<h3>Gachon University - Biomedical Engineering (2025 ~ 2027)</h3>
						<p>
							Currently studying the intersection of medicine and technology,
							focusing on medical device development, biomedical signal
							processing, and healthcare system design. Learning to apply
							engineering principles to solve medical challenges and improve
							patient care.
						</p>
					</li>
					<li>
						<h3>
							Sung-il Information High School - Software Development (2022 ~
							2024)
						</h3>
						<p>
							Completed comprehensive software development curriculum including
							programming fundamentals, web development, database management,
							and software engineering principles. Gained hands-on experience
							with various programming languages and development frameworks.
						</p>
					</li>
				</ul>
			</div>

			<div>
				<h2>Awards</h2>
				<ul>
					<li>
						<h3>Ministry of Education Award</h3>
						<p>
							<strong>Project: Sign GPT</strong> - Developed an accessible
							ChatGPT alternative specifically designed for the deaf and hard of
							hearing community. The project created a comprehensive demo that
							enables deaf users to interact with AI through sign language,
							making conversational AI technology more inclusive and accessible.
							This innovation was highly recognized for its social impact and
							technical excellence.
						</p>
						<Image
							src={"/imgs/award1.jpg"}
							width={200}
							height={0}
							alt="award1"
						/>
					</li>
				</ul>
			</div>

			<div>
				<h2>Current Interests</h2>
				<p>
					My recent focus has shifted beyond simply using AI tools to a deeper
					question:{" "}
					<strong>
						How can I make AI work like a colleague who efficiently handles my
						tasks?
					</strong>{" "}
					I'm exploring ways to integrate AI not as a replacement, but as a
					collaborative partner that understands my workflow and amplifies my
					productivity.
				</p>
				<p>
					In this era where countless AI technologies emerge daily, I'm
					constantly reflecting on{" "}
					<strong>what attitude I should maintain as a developer</strong>.
					Rather than being overwhelmed by the rapid changes, I choose to see
					each new technology as an opportunity to better serve people and solve
					problems more effectively.
				</p>
				<p>
					What keeps me going is a simple but powerful belief:
					<strong>"If you can imagine it, you can achieve it."</strong> This is
					why I never give up. Every challenge, every setback, and every
					seemingly impossible problem is just another step toward turning
					imagination into reality. This mindset drives me to continue pushing
					boundaries and creating solutions that seemed impossible yesterday.
				</p>
			</div>
		</div>
	);
}
