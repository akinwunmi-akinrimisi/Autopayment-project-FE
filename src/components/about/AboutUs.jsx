import pc_screen from "../../assets/home/about-1.svg";
import phone_screen from "../../assets/home/about-2.svg";
import phone_duplicate from "../../assets/home/about-3.svg";

const AboutUs = () => {
    const steps = [
        {
            title: "Empowering Trust and Growth",
            description: "We are a Web3-enabled platform dedicated to simplifying payment processes, ensuring your funds are protected, and transactions are transparent.",
            image: pc_screen,
            imageAlt: "PC SCREEN",
            imageRight: true
        },
        {
            title: "FLexiscrow: Secure Payment Solutions For Small Businesses",
            description: "At Lexiscrow, we understand the challenges small businesses face with payment security and customer trust. Our platform leverages blockchain-powered escrow to hold payments securely until your product or service is delivered. Vendors can create detailed, professional invoices, while customers pay confidently, knowing funds are safely held and only released upon confirmation.",
            image: phone_screen,
            imageAlt: "PHONE SCREEN",
            imageRight: false
        },
        {
            title: "Secure, Transparent, and Effortless Transactions",
            description: "Our mission is simple: to create a seamless, reliable invoicing experience that builds trust and supports growth for businesses and freelancers alike. With Lexiscrow, you gain access to advanced features like automated notifications, transparent transaction histories, and efficient dispute resolution, making every transaction smooth and stress-free.",
            image: phone_duplicate,
            imageAlt: "PHONE DUPLICATE",
            imageRight: true
        },

    ];


    return (
        <div
            className="w-full flex flex-col items-center px-4 md:px-10 xl:px-[81px] mt-12 md:mt-[104px]"

        >
            <h2
                className="text-2xl text-left md:text-3xl lg:text-[40px] font-semibold text-[#FF8D50] leading-tight md:leading-[60px] "
            >
                About Us
            </h2>

            <div className="flex flex-col gap-16 md:gap-24 lg:gap-[144px] mt-16">
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
                                className="text-xl md:text-2xl lg:text-[24px] font-semibold leading-tight md:leading-[36px] text-left text-primary-base "

                            >
                                {step.title}
                            </h3>
                            <p
                                className="text-base md:text-lg lg:text-[22px] font-normal leading-relaxed lg:leading-[33px] text-text text-left"

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
                                className="w-full md:max-w-[300px] xl:max-w-[700px] h-auto object-contain"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default AboutUs;