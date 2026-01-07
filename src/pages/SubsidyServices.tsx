import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tractor,
  Wheat,
  Sprout,
  Banknote,
  CheckCircle,
  Landmark,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";

const SubsidyServices = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* ================= HERO ================= */}
      <section className="py-20 bg-gradient-to-br from-green-100 to-green-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Government <span className="text-green-600">Subsidy Schemes</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Financial assistance and subsidies for villagers, farmers, and rural
            entrepreneurs to start or expand agricultural activities.
          </p>
        </div>
      </section>

      {/* ================= SUBSIDY CARDS ================= */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Banknote,
                title: "Rural Business & Self Employment",
                description:
                  "Government financial support for villagers starting small businesses or self-employment.",
                benefits: [
                  "Mudra loan assistance",
                  "PMEGP subsidy",
                  "SHG & women entrepreneur schemes",
                  "Skill development programs",
                ],
              },
              {
                icon: Landmark,
                title: "State & Central Government Schemes",
                description:
                  "Complete assistance for applying to various state and central government subsidy schemes.",
                benefits: [
                  "Scheme eligibility check",
                  "Application filing support",
                  "Document preparation",
                  "Status tracking",
                ],
              },
            ].map((scheme, index) => (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-all"
              >
                <CardHeader>
                  <scheme.icon className="h-12 w-12 text-green-600 mb-4" />
                  <CardTitle className="text-2xl">{scheme.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {scheme.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {scheme.benefits.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                    <NavLink to="/contact">
                      Apply for Subsidy Assistance
                    </NavLink>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="py-20 bg-section-bg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-10">
            How We Help You Get Subsidy
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              "Eligibility Check",
              "Document Collection",
              "Application Submission",
              "Approval & Follow-up",
            ].map((step, index) => (
              <div key={index} className="p-6 rounded-lg shadow bg-background">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {index + 1}
                </div>
                <p className="font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Planning to Start Farming or Buy a Tractor?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Let us help you get the maximum government subsidy with proper
            guidance and documentation.
          </p>
          <Button size="lg" variant="outline" asChild className="bg-white text-green-700">
            <NavLink to="/contact">Get Free Guidance</NavLink>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SubsidyServices;
