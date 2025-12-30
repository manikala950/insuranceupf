import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhoneCall, FileCheck, Search, Send, BadgeCheck } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const Process = () => {
  const steps = [
    {
      icon: PhoneCall,
      number: "01",
      title: "Initial Consultation",
      description: "Contact us via phone, email, or our website. We'll discuss your situation, understand your needs, and explain how we can help. This consultation is completely free with no obligations.",
      duration: "Same Day",
    },
    {
      icon: FileCheck,
      number: "02",
      title: "Documentation Collection",
      description: "We'll provide you with a complete checklist of required documents. Our team guides you through gathering necessary paperwork including death certificates, policy documents, and identification.",
      duration: "2-3 Days",
    },
    {
      icon: Search,
      number: "03",
      title: "Review & Verification",
      description: "Our experts thoroughly review all documents for accuracy and completeness. We verify policy details, beneficiary information, and ensure all regulatory requirements are met.",
      duration: "3-5 Days",
    },
    {
      icon: Send,
      number: "04",
      title: "Claim Submission",
      description: "We prepare and submit your complete claim package to the insurance company with all necessary supporting documentation. We handle all communication and follow-ups on your behalf.",
      duration: "1-2 Days",
    },
    {
      icon: BadgeCheck,
      number: "05",
      title: "Processing & Disbursement",
      description: "We monitor your claim status, coordinate with the insurance company, and keep you updated throughout. Once approved, we ensure smooth fund disbursement to your designated account.",
      duration: "15-30 Days",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 animate-fade-in">
            How It <span className="text-primary">Works</span>
          </h1>
          <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Our simple, transparent 5-step process ensures your death policy claim is handled efficiently and professionally
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center animate-fade-in ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <Card className="border-2 border-primary/20 shadow-xl">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="text-6xl font-bold text-primary/20">{step.number}</div>
                        <step.icon className="h-16 w-16 text-primary" />
                      </div>
                      <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                      <p className="text-lg text-muted-foreground mb-4">{step.description}</p>
                      <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                        <span className="text-sm font-semibold text-primary">
                          Timeline: {step.duration}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-4xl font-bold text-primary mx-auto md:mx-0">
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-24 left-12 w-0.5 h-32 bg-primary/30" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Summary */}
      <section className="py-20 bg-section-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Complete Process Timeline</h2>
          <Card className="border-none shadow-xl max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b">
                  <span className="font-semibold text-lg">Total Duration:</span>
                  <span className="text-2xl font-bold text-primary">3-6 Weeks</span>
                </div>
                <p className="text-muted-foreground">
                  The actual timeline may vary depending on the insurance company's processing time and the complexity of your case. We work diligently to expedite every step while ensuring accuracy and compliance.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">98%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">5000+</div>
                    <div className="text-sm text-muted-foreground">Claims Processed</div>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground">Support Available</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Documents You'll Need</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              "Original Death Certificate",
              "Policy Document(s)",
              "Claimant's Identity Proof",
              "Address Proof",
              "Cancelled Cheque / Bank Details",
              "Medical Records (if required)",
              "Legal Heir Certificate",
              "Discharge Certificate",
              "Photo Identification",
            ].map((doc, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <FileCheck className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <span className="font-medium">{doc}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
            Don't worry if you're unsure about any documents. Our team will provide you with a personalized checklist and guide you through the entire process.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Claim?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Contact us today for a free consultation. Our expert team will guide you through every step of the process.
          </p>
          <Button size="lg" variant="outline" asChild className="bg-background text-primary hover:bg-background/90 border-none text-lg">
            <NavLink to="/contact">Get Started Now</NavLink>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Process;
