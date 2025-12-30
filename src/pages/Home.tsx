import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, FileText, Users, CheckCircle, Clock, Heart } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import heroImage from "@/assets/hero-family.jpg";
import officeImage from "@/assets/office-team.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Supporting families"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 to-foreground/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-background mb-6 animate-fade-in">
              Supporting Families Through{" "}
              <span className="text-primary">Policy Claims</span>
            </h1>
            <p className="text-xl md:text-2xl text-background/90 mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              We help families navigate death policy claims with compassion, expertise, and complete transparency. Your trusted partner in difficult times.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Button size="lg" asChild className="text-lg">
                <NavLink to="/contact">Get Started Today</NavLink>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg bg-background/10 border-background text-background hover:bg-background hover:text-foreground">
                <NavLink to="/services">Learn More</NavLink>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-section-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose UPLIFE India?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We combine expertise with empathy to provide exceptional support during challenging times
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Expert Guidance",
                description: "Our experienced team handles all aspects of policy claims with professional expertise and attention to detail.",
              },
              {
                icon: Heart,
                title: "Compassionate Support",
                description: "We understand the emotional difficulty of losing a loved one and provide sensitive, caring assistance.",
              },
              {
                icon: FileText,
                title: "Complete Documentation",
                description: "We handle all paperwork, forms, and documentation required for successful policy claims.",
              },
              {
                icon: Clock,
                title: "Fast Processing",
                description: "Our streamlined process ensures quick turnaround times without compromising accuracy.",
              },
              {
                icon: CheckCircle,
                title: "100% Transparency",
                description: "Clear communication at every step with no hidden fees or surprise charges.",
              },
              {
                icon: Users,
                title: "Dedicated Team",
                description: "Personal support from a dedicated claims specialist throughout the entire process.",
              },
            ].map((feature, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Your Trusted Partner in <span className="text-primary">Policy Claims</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                UPLIFE India Pvt Ltd specializes in helping families navigate the complex process of claiming life insurance policies after the loss of a loved one. With years of experience and a deep understanding of insurance regulations, we provide end-to-end support to ensure your claims are processed smoothly and efficiently.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Our mission is to reduce the burden on grieving families by handling all the paperwork, communication with insurance companies, and legal requirements, allowing you to focus on what matters most.
              </p>
              <Button size="lg" asChild>
                <NavLink to="/about">Learn More About Us</NavLink>
              </Button>
            </div>
            <div className="relative">
              <img
                src={officeImage}
                alt="UPLIFE India team"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Let us help you navigate the policy claim process with expertise and compassion. Contact us today for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" asChild className="bg-background text-primary hover:bg-background/90 border-none text-lg">
              <NavLink to="/contact">Contact Us</NavLink>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-background text-background hover:bg-background hover:text-primary text-lg">
              <NavLink to="/process">See How It Works</NavLink>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
