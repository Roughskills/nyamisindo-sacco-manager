
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const ImageCarousel = () => {
  const milkImages = [
    {
      src: "/lovable-uploads/5270e3a7-68c7-4872-8bb8-3577295649b2.png",
      alt: "Farmer milking cow"
    },
    {
      src: "/lovable-uploads/40e63c42-bf7a-4837-82b2-a3ed1de37147.png",
      alt: "Dairy cattle in facility"
    },
    {
      src: "/lovable-uploads/08b2cab9-5e75-409e-8e81-f5635c7a2f45.png",
      alt: "Farmer with milk transport"
    },
    {
      src: "/lovable-uploads/b4951201-dc96-4e91-ba61-eff2d06fa51e.png",
      alt: "Milk collection with bicycle"
    },
    {
      src: "/lovable-uploads/9a0581ed-f998-4b6c-8dad-7d6e491be959.png",
      alt: "Traditional milk collection"
    },
    {
      src: "/lovable-uploads/dbe686ba-9d10-447b-9e30-97453f740382.png",
      alt: "Milk processing facility"
    },
    {
      src: "/lovable-uploads/674f3b8b-10d9-41f5-af4a-fe758cb395f1.png",
      alt: "Farmer milking process"
    },
    {
      src: "/lovable-uploads/a9bc0811-c655-4b05-87de-53a9aeb856c9.png",
      alt: "Dairy farming activities"
    },
    {
      src: "/lovable-uploads/4f5c5c7a-a091-4327-a01f-8a9ed50b0e17.png",
      alt: "Milk collection process"
    },
    {
      src: "/lovable-uploads/c59c0326-57bb-49e4-a7eb-6c728579f436.png",
      alt: "Milk processing equipment"
    },
    {
      src: "/lovable-uploads/0271928c-8400-4f47-bbe5-9a7188a1b552.png",
      alt: "Industrial milk processing"
    },
    {
      src: "/lovable-uploads/38792e50-48c0-4f46-92fc-820a2ff1f442.png",
      alt: "Milk testing and quality control"
    },
    {
      src: "/lovable-uploads/e396651b-6075-4523-b675-ed9499f777e9.png",
      alt: "Modern milk processing facility"
    },
    {
      src: "/lovable-uploads/08179d14-0f42-4a80-a6aa-17d79ffe997f.png",
      alt: "Milk processing tanks"
    },
    {
      src: "/lovable-uploads/32cc625f-c0ad-42ea-ade9-1bf9d73d9ed0.png",
      alt: "Professional milk processing"
    },
    {
      src: "/lovable-uploads/aeccd7da-0728-41bc-93cb-fecf909e1dc1.png",
      alt: "Traditional milk handling"
    },
    {
      src: "/lovable-uploads/671a9e5b-a1d2-4808-beec-e66d6f03ae1e.png",
      alt: "Dairy farm structure"
    },
    {
      src: "/lovable-uploads/39bf3300-da67-4e46-aa6e-89ee8efaba00.png",
      alt: "Industrial milk processing equipment"
    }
  ];

  return (
    <div className="mb-6">
      <Carousel 
        className="w-full max-w-4xl mx-auto"
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {milkImages.map((image, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
