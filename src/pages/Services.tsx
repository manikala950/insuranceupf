import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Phone,
  Shield,
  CheckCircle,
  Users,
  Building,
  Scale,
  Headphones,
  Briefcase,
  Landmark,
  Tractor,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import documentsImage from "@/assets/documents.jpg";

const Services = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* ================= HERO SECTION ================= */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 animate-fade-in">
            Our <span className="text-primary">Services</span>
          </h1>
          <p
            className="text-xl text-center text-muted-foreground max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Insurance claim assistance, government services, and entrepreneurship
            support — all under one roof.
          </p>
        </div>
      </section>

      {/* ================= MAIN SERVICES ================= */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Complete Documentation Support",
                description:
                  "We handle all paperwork, forms, and documentation required for your policy claim with accuracy and timeliness.",
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
                description:
                  "Direct coordination with insurance companies to ensure faster claim processing and resolution.",
                features: [
                  "Company coordination",
                  "Regular follow-ups",
                  "Status tracking",
                  "Query resolution",
                ],
              },
              {
                icon: Scale,
                title: "Legal Compliance & Advisory",
                description:
                  "Expert guidance on legal requirements and compliance to avoid claim rejections or delays.",
                features: [
                  "Legal document review",
                  "Compliance checks",
                  "Regulatory guidance",
                  "Dispute support",
                ],
              },
              {
                icon: Shield,
                title: "Policy Verification",
                description:
                  "Detailed verification of policy terms, coverage, and beneficiary details.",
                features: [
                  "Policy validation",
                  "Beneficiary verification",
                  "Coverage assessment",
                  "Premium check",
                ],
              },
              {
                icon: Users,
                title: "Family Support Services",
                description:
                  "Compassionate guidance and dedicated assistance for families during difficult times.",
                features: [
                  "Personal claim assistant",
                  "Process explanation",
                  "Timeline management",
                  "Emotional support",
                ],
              },
              {
                icon: CheckCircle,
                title: "End-to-End Claim Management",
                description:
                  "Complete claim handling from initiation to settlement for a stress-free experience.",
                features: [
                  "Claim initiation",
                  "Progress monitoring",
                  "Documentation tracking",
                  "Fund release coordination",
                ],
              },

              /* ================= FARM & TRACTOR SUBSIDY (NEW CARD) ================= */

              {
                icon: Tractor,
                title: "Farmer & Tractor Subsidy Assistance",
                description:
                  "Government subsidies for villagers to start farming, buy tractors, dairy units, and agricultural equipment.",
                features: [
                  "Tractor & machinery subsidy",
                  "New farm & irrigation subsidy",
                  "Dairy, poultry & animal farming",
                  "PMEGP & rural business support",
                ],
                link: "/subsidy-services",
                buttonText: "View Subsidy Schemes",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <CardHeader>
                  <service.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-2xl">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {/*ENTREPRENEURSHIP */}
                  {service.link && (
                    <Button asChild className="mt-6 w-full">
                      <NavLink to={service.link}>
                        {service.buttonText}
                      </NavLink>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ADDITIONAL SUPPORT ================= */}
      <section className="py-20 bg-section-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Additional Support Services
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <Building className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-semibold mb-4">
                  Multi-Policy Handling
                </h3>
                <p className="text-muted-foreground mb-4">
                  We manage multiple insurance claims simultaneously to ensure
                  faster settlements.
                </p>
                <ul className="space-y-2">
                  {[
                    "Multiple insurer coordination",
                    "Consolidated documentation",
                    "Parallel processing",
                    "Unified tracking",
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
                <h3 className="text-2xl font-semibold mb-4">
                  24/7 Support Helpline
                </h3>
                <p className="text-muted-foreground mb-4">
                  Dedicated support team available anytime to assist you.
                </p>
                <ul className="space-y-2">
                  {[
                    "24/7 phone support",
                    "Email assistance",
                    "Live support",
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

      {/* ================= PROCESS PREVIEW ================= */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img
              src={documentsImage}
              alt="Process"
              className="rounded-lg shadow-xl w-full"
            />
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Simple & Transparent{" "}
                <span className="text-primary">Process</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                A clear, step-by-step approach that keeps you informed and
                stress-free.
              </p>
              <Button size="lg" asChild>
                <NavLink to="/process">See How It Works</NavLink>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Need Professional Assistance?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Contact us today for insurance claims, government services, or
            business support.
          </p>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="bg-background text-primary border-none text-lg"
          >
            <NavLink to="/contact">Get Free Consultation</NavLink>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;
