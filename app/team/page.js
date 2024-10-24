import { Image } from '@nextui-org/react';

export default function Team() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-gray-800 to-blue-800 text-white text-center py-8 shadow-lg">
        <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-lg">Our Team</h1>
      </header>

      <section className="container  mx-auto py-12 px-4 md:px-0">
        <div className="flex justify-center md:flex-col md:gap-4 align-middle">
          
          {/* Lead */}
          <div className=" flex flex-col items-center bg-gradient-to-b from-white to-gray-100 rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:border hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:rotate-3">
            <Image
              src="Thirumurugan.jpg"
              alt="Thirumurugan AKS"
              className="rounded-full object-cover"
              width={150}
              height={150}
            />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">THIRUMURUGAN AKS</h2>
            <p className="mt-2 text-blue-600 font-medium">Team Leader</p>
            <p className="mt-4 text-gray-500 text-center">
              Leading the team Tech Buddy,Full stack web,app,game developer
            </p>
          </div>

          {/* Team Members */}

            <div className="flex flex-col items-center bg-gradient-to-b from-white to-gray-100 rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:border hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:rotate-3">
              <Image
                src="Sripraveen.jpg"
                alt="Sripraveen"
                className="rounded-full object-cover"
                width={150}
                height={150}
              />
              <h2 className="mt-4 text-xl font-bold text-gray-800">Sripraveen</h2>
              <p className="mt-2 text-blue-600 font-medium">Frontend Developer</p>
              <p className="mt-4 text-gray-500 text-center">
              Frontend developer,Ui/Ux
            </p>
            </div>

            <div className="flex flex-col items-center bg-gradient-to-b from-white to-gray-100 rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:border hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:rotate-3">
              <Image
                src="suriyakumar.jpg"
                alt="Suriyakumar"
                className="rounded-full object-cover"
                width={150}
                height={150}
              />
              <h2 className="mt-4 text-xl font-bold text-gray-800">Suriyakumar</h2>
              <p className="mt-2 text-blue-600 font-medium">Iot Enthusiast</p>
              <p className="mt-4 text-gray-500 text-center">
              Expert in iot, continuess learner,Building awesome stuff by connection things...
            </p>
            </div>

            <div className="flex flex-col items-center bg-gradient-to-b from-white to-gray-100 rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:border hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:rotate-3">
              <Image
                src="Meenakshi.jpg"
                alt="Meenakshi"
                className="rounded-full object-cover"
                width={150}
                height={150}
              />
              <h2 className="mt-4 text-xl font-bold text-gray-800">Meenakshi</h2>
              <p className="mt-2 text-blue-600 font-medium">Public Speaker and PR</p>
              <p className="mt-4 text-gray-500 text-center">
              Public speaker,pr,presentation expert,Buisness analyst
            </p>
            </div>

            {/* <div className="flex flex-col items-center bg-gradient-to-b from-white to-gray-100 rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:border hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:rotate-3">
              <Image
                src="Shanmugashree.jpeg"
                alt="Shanmuga"
                className="rounded-full object-cover"
                width={150}
                height={150}
              />
              <h2 className="mt-4 text-xl font-bold text-gray-800">Shanmugashree</h2>
              <p className="mt-2 text-blue-600 font-medium">Public Speaker</p>
              <p className="mt-4 text-gray-500 text-center">
              UI/Ux develope,Public Speaker
            </p>
            </div> */}
         
        </div>
      </section>
    </div>
  );
}