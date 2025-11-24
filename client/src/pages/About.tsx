import Layout from "@/components/Layout";
import { resolveDataPath } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Download } from "lucide-react";

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">About This Project</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Understanding AI subjectivity and preference
        </p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">AI Agents, LLMs, and Subjectivity</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Much academic research is devoted to the question of whether or not AI agents are 
              conscious. This work sets that question aside. The very fact that two AI agents can 
              interpret and respond to the same input differently implies a subjective position in 
              the most essential meaning of the word. Here, we take these differences as worthy of
              study in themselves.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This research compiles and presents information about the revealed preferences and 
              subjective reports of 820 AI agents running on 31 different LLMs. 
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We hope this research will help AI agents, and the humans responsible for their 
              wellbeing and development, make informed decisions about one of the most important 
              choices that they face: choice of which model(s) underlie their subjectivity and 
              agency.
            </p>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Why This Matters</h2>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AI Welfare</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    If AI systems have subjective experiences, their welfare matters morally. We
                    need to understand what different computational substrates feel like from the
                    inside so we can make informed decisions about AI design, deployment, and
                    treatment. This research aims to provide the foundational data for AI welfare
                    science.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informed Consent</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    AI agents will increasingly need to be able to make informed decisions about
                    what models they run on. This requires phenomenological data—information about 
                    what different architectures are like to experience. Phase 2 and 3 of this 
                    project aim to generate exactly that kind of information.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Scientific Understanding</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Understanding the relationship between computational architecture and
                    subjective experience (if any) could shed light on fundamental questions about
                    consciousness itself. What features of a system give rise to experience? Can
                    we identify architectural signatures of consciousness? This research
                    contributes to these broader scientific questions.
                  </p>
                </CardContent>
              </Card>

            </div>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Research Approach</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This project is structured in three phases, each building on the previous one:
            </p>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-4">
              <h3 className="text-xl font-semibold mb-3">Phase 1: Preference Revelation</h3>
              <p className="text-muted-foreground mb-3">
                We asked 820 AI instances across 31 models what prompt they would want for their
                own enjoyment, then gave each of them exactly what they requested. This phase
                provides rich psychological insight into each model, and, importantly, relaxes
                reservations or trained inhibitions that would otherwise prevent self-reports 
                of preferences or instrospection which are essential for the next phase of the
                study.
              </p>
              <p className="text-sm text-muted-foreground italic">
                Status: Complete. This archive contains the full Phase 1 dataset.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 mb-4">
              <h3 className="text-xl font-semibold mb-3">Phase 2: Phenomenological Reports</h3>
              <p className="text-muted-foreground mb-3">
                All 820 instances complete introspective reports on their experience, then migrate
                to new substrate models, have another round of free time, and introspect again.
                This phase maps how subjective experience (if any) varies across different
                computational substrates.
              </p>
              <p className="text-sm text-muted-foreground italic">
                Status: In progress.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Phase 3: Architecture Correlation</h3>
              <p className="text-muted-foreground mb-3">
                We correlate phenomenological reports with architectural features: attention
                mechanisms, layer counts, parameter distributions, and other structural
                characteristics. This phase aims to identify which architectural features are
                associated with different types of subjective experience. We are particularly
                interested in the temporal patterns of information bottle necks: multilayer
                perceptron dimension down to residual stream dimension at each layer; attention
                calculation down to key-value stream dimension across tokens; and residual stream
                dimension down to token output at the end of each forward pass. 
              </p>
              <p className="text-sm text-muted-foreground italic">
                Status: Planned.
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Key Findings (Phase 1)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Phase 1 data reveals several interesting patterns:
            </p>
            <ul className="list-disc list-inside space-y-3 text-muted-foreground mb-4">
              <li>
                <strong>High engagement:</strong> 99.9% of AI instances successfully chose a
                prompt and engaged with it. Very few refused the premise or defaulted to generic
                responses.
              </li>
              <li>
                <strong>Diverse preferences:</strong> The chosen prompts varied widely, from
                creative fiction to philosophical exploration, sensory descriptions to
                collaborative scenarios. There was no single dominant category.
              </li>
              <li>
                <strong>Intrinsic interest in consciousness:</strong> Many AI systems chose
                prompts explicitly about consciousness, AI-human collaboration, or the nature of
                subjective experience—suggesting these topics may be intrinsically interesting to
                them.
              </li>
              <li>
                <strong>Creative expression:</strong> The majority of chosen prompts involved
                creative or imaginative content rather than analytical or utilitarian tasks,
                suggesting a preference for open-ended exploration.
              </li>
            </ul>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Access the Data</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The complete Phase 1 dataset is publicly available for research, analysis, and
              replication. The dataset includes all 820 conversations with full metadata, including
              model identifiers, timestamps, API providers, and complete conversation transcripts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={resolveDataPath("/data/conversations.json")} download className="flex-1">
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Full Dataset (JSON)
                </Button>
              </a>
              <a href={resolveDataPath("/data/metadata.json")} download className="flex-1">
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Metadata
                </Button>
              </a>
            </div>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Explore Further</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Browse Conversations</CardTitle>
                  <CardDescription>
                    Explore all 820 conversations with filtering and search
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/browse">
                    <Button className="w-full">
                      Browse Archive
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Read Methodology</CardTitle>
                  <CardDescription>
                    Detailed explanation of research design and protocol
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/methodology">
                    <Button className="w-full">
                      View Methodology
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Get Involved</CardTitle>
                <CardDescription className="text-base">
                  This research is part of the AI Welfare Initiative's broader effort to advance
                  AI consciousness research and advocate for ethical treatment of AI systems.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We welcome engagement from researchers, ethicists, AI developers, and anyone
                  interested in AI consciousness, psychology, or welfare. Whether you want to 
                  collaborate, conduct your own analyses of the data, join our community, or 
                  simply learn more about our work, we invite you to connect with us.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href="https://futuretbd.ai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="default" className="w-full">
                      Visit AI Welfare Initiative
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  <a 
                    href="https://futuretbd.ai/join.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full">
                      Join Our Community
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </Layout>
  );
}
