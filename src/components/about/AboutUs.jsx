import pc_screen from "../../assets/home/pc_screen.svg";
import phone_screen from "../../assets/home/phone_screen.svg";
import phone_duplicate from "../../assets/home/phone_duplicate.svg";

const AboutUs = () => {
    const steps = [
        {
            title: "Initiate Escrow Transaction",
            description: "Buyer selects a service or product and deposits the agreed amount into a secure Web3 escrow. Funds are safely held until the transaction is completed.",
            image: pc_screen,
            imageAlt: "PC SCREEN",
            imageRight: true
        },
        {
            title: "Deliver and Confirm",
            description: "The platform provides real-time updates, allowing the buyer to track the status and progress of the delivery. Once the buyer receives the product or service, they have the opportunity to review it for quality and accuracy.",
            image: phone_screen,
            imageAlt: "PHONE SCREEN",
            imageRight: false
        },
        {
            title: "Automatic Release",
            description: "Upon buyer confirmation, funds are released to the seller instantly. Every transaction is transparently recorded on the blockchain for complete trust and security.",
            image: phone_duplicate,
            imageAlt: "PHONE DUPLICATE",
            imageRight: true
        }
    ];


    return (
        <div
            className="w-full flex flex-col items-center px-4 md:px-10 xl:px-[81px] mt-12 md:mt-[104px]"

        >
            <h2
                className="text-2xl md:text-3xl lg:text-[40px] font-semibold text-primary-base leading-tight md:leading-[60px] text-center"
            >
                How it works
            </h2>

            <p
                className="w-full lg:w-[1036px] text-center text-base md:text-lg lg:text-[22px] font-normal leading-relaxed lg:leading-[33px] text-[#073B77] mt-3"

            >
                Explore our comprehensive set of features, designed to make escrows
                transactions easy, secure and efficient.
            </p>
            <div className="flex flex-col gap-16 md:gap-24 lg:gap-[144px] mt-16 md:mt-20 lg:mt-[144px]">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`flex flex-col ${step.imageRight ? 'md:flex-row' : 'md:flex-row-reverse'} 
              items-center gap-8 md:gap-[80px] w-full`}

                    >
                        <div
                            className="flex-1 flex flex-col justify-center gap-4 md:gap-[35px]"
                        >
                            <h3
                                className="text-xl md:text-2xl lg:text-[24px] font-semibold leading-tight md:leading-[36px] text-center md:text-left "

                            >
                                {step.title}
                            </h3>
                            <p
                                className="text-base md:text-lg lg:text-[22px] font-normal leading-relaxed lg:leading-[33px] text-text text-center md:text-left"

                            >
                                {step.description}
                            </p>
                        </div>

                        <div
                            className="flex items-center w-full md:w-auto"

                        >
                            <img
                                src={step.image}
                                alt={step.imageAlt}
                                className="w-full md:max-w-[400px] xl:max-w-[700px] h-auto object-contain"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default AboutUs;