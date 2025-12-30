import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Award, Users } from "lucide-react";
import officeImage from "@/assets/office-team.jpg";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 animate-fade-in">
            About <span className="text-primary">UPLIFE India</span>
          </h1>
          <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Your trusted partner in navigating death policy claims with expertise, compassion, and integrity
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-4">
                UPLIFE India Pvt Ltd was founded with a singular mission: to support families during one of life's most difficult moments. We recognized that navigating insurance policy claims after losing a loved one can be overwhelming, confusing, and emotionally draining.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Our founders, having witnessed firsthand the challenges families face, decided to create a service that combines professional expertise with genuine human compassion. Today, we've helped thousands of families successfully claim their rightful benefits.
              </p>
              <p className="text-lg text-muted-foreground">
                With a team of experienced insurance professionals, legal advisors, and empathetic support staff, we've built a reputation as India's most trusted death policy claim assistance company.
              </p>
            </div>
            <div>
              <img
                src={officeImage}
                alt="UPLIFE India office"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-section-bg">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <Target className="h-16 w-16 text-primary mb-4" />
                <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg text-muted-foreground">
                  To provide compassionate, professional, and efficient support to families navigating death policy claims, ensuring they receive their rightful benefits without added stress or complexity during their time of grief.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <Eye className="h-16 w-16 text-primary mb-4" />
                <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
                <p className="text-lg text-muted-foreground">
                  To become India's most trusted and comprehensive death policy claim assistance provider, known for our integrity, expertise, and unwavering commitment to supporting families through challenging times.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Compassion",
                description: "We approach every case with empathy, understanding the emotional weight our clients carry.",
              },
              {
                title: "Integrity",
                description: "Complete transparency in our processes, fees, and communication at every step.",
              },
              {
                title: "Expertise",
                description: "Deep knowledge of insurance laws, regulations, and claim procedures across all providers.",
              },
              {
                title: "Efficiency",
                description: "Streamlined processes that minimize delays while maintaining accuracy and compliance.",
              },
              {
                title: "Trust",
                description: "Building long-term relationships based on reliability, honesty, and consistent results.",
              },
              {
                title: "Excellence",
                description: "Commitment to the highest standards of service quality in everything we do.",
              },
            ].map((value, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-primary">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "5000+", label: "Successful Claims" },
              { value: "98%", label: "Success Rate" },
              { value: "15+", label: "Years Experience" },
              { value: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Users className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Our Expert Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our multidisciplinary team brings together insurance experts, legal advisors, and compassionate support professionals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                role: "Insurance Specialists",
                description: "Certified professionals with deep expertise in life insurance policies and claim procedures across all major providers in India.",
              },
              {
                role: "Legal Advisors",
                description: "Experienced legal consultants who ensure all documentation and procedures comply with current insurance laws and regulations.",
              },
              {
                role: "Client Support Staff",
                description: "Trained empathetic professionals who provide personalized support and clear communication throughout your claim journey.",
              },
            ].map((team, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-8">
                  <Award className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-semibold mb-3">{team.role}</h3>
                  <p className="text-muted-foreground">{team.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    
    </div>
  );
};

export default About;
