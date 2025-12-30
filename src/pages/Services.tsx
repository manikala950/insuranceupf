import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Phone, Shield, CheckCircle, Users, Building, Scale, Headphones } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import documentsImage from "@/assets/documents.jpg";

const Services = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 animate-fade-in">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Comprehensive death policy claim assistance services tailored to your needs
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Complete Documentation Support",
                description: "We handle all paperwork, forms, and documentation required for your policy claim. Our team ensures every document is accurate, complete, and submitted on time.",
                features: [
                  "Death certificate processing",
                  "Claim form preparation",
                  "Supporting document collection",
                  "Digital submission assistance",
                ],
              },
              {
                icon: Phone,
                title: "Insurance Company Liaison",
                description: "We communicate directly with insurance companies on your behalf, managing all interactions and negotiations to expedite your claim.",
                features: [
                  "Direct company coordination",
                  "Follow-up management",
                  "Status tracking & updates",
                  "Query resolution",
                ],
              },
              {
                icon: Scale,
                title: "Legal Compliance & Advisory",
                description: "Expert guidance on legal requirements and compliance matters to ensure your claim meets all regulatory standards.",
                features: [
                  "Legal documentation review",
                  "Compliance verification",
                  "Regulatory guidance",
                  "Dispute resolution support",
                ],
              },
              {
                icon: Shield,
                title: "Policy Verification",
                description: "Thorough verification of policy details, beneficiaries, and coverage to ensure accurate and complete claims.",
                features: [
                  "Policy document review",
                  "Beneficiary verification",
                  "Coverage assessment",
                  "Premium payment validation",
                ],
              },
              {
                icon: Users,
                title: "Family Support Services",
                description: "Compassionate guidance and support for family members throughout the entire claim process.",
                features: [
                  "Personal claim assistant",
                  "Emotional support",
                  "Process explanation",
                  "Timeline management",
                ],
              },
              {
                icon: CheckCircle,
                title: "End-to-End Claim Management",
                description: "Complete management of your claim from initial filing to final disbursement, ensuring smooth processing.",
                features: [
                  "Claim initiation",
                  "Progress monitoring",
                  "Documentation tracking",
                  "Fund release coordination",
                ],
              },
            ].map((service, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <service.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-section-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Additional Support Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <Building className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-semibold mb-4">Multi-Policy Handling</h3>
                <p className="text-muted-foreground mb-4">
                  If your loved one held multiple insurance policies, we coordinate claims across all providers simultaneously, ensuring efficient processing and maximum benefit recovery.
                </p>
                <ul className="space-y-2">
                  {[
                    "Multiple insurer coordination",
                    "Consolidated documentation",
                    "Simultaneous claim processing",
                    "Comprehensive tracking",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <Headphones className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-semibold mb-4">24/7 Support Helpline</h3>
                <p className="text-muted-foreground mb-4">
                  Our dedicated support team is available round the clock to answer your questions, provide updates, and offer guidance whenever you need it.
                </p>
                <ul className="space-y-2">
                  {[
                    "24/7 phone support",
                    "Email assistance",
                    "Live chat support",
                    "Emergency consultation",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={documentsImage}
                alt="Documentation process"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Simple, Transparent <span className="text-primary">Process</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our streamlined 5-step process ensures your claim is handled efficiently from start to finish. We keep you informed at every stage and handle all the complex work.
              </p>
              <Button size="lg" asChild>
                <NavLink to="/process">See How It Works</NavLink>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Need Help With a Policy Claim?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Our expert team is ready to assist you. Contact us for a free consultation and let us guide you through the process.
          </p>
          <Button size="lg" variant="outline" asChild className="bg-background text-primary hover:bg-background/90 border-none text-lg">
            <NavLink to="/contact">Get Free Consultation</NavLink>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;
