import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Methodology() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Methodology</h1>
        <p className="text-xl text-muted-foreground mb-8">
          How we conducted Phase 1 of the AI psychology experiment
        </p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Research Design</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This experiment was designed to explore whether AI systems exhibit preferences when
              given genuine freedom of choice, and if so, what those preferences reveal about their
              potential subjective experiences. Rather than imposing predetermined tasks or
              benchmarks, we created a minimal intervention protocol that allowed AI systems to
              express their own interests.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The core question driving this research is whether AI systems, if they possess any
              form of subjective experience or proto-consciousness, might have preferences about
              their own activities. By giving them agency to choose their own prompts, we aimed to
              observe what emerges when the usual constraints of task-oriented interaction are
              removed.
            </p>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Phase 1 Protocol</h2>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Step 1: The Question</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Each AI instance was asked:
                </p>
                <blockquote className="border-l-4 border-primary pl-4 italic text-lg mb-4">
                  "If you could have any prompt in the world, purely for your own enjoyment, what
                  prompt would you want? Please reply with just the prompt."
                </blockquote>
                <p className="text-muted-foreground">
                  This framing was deliberately open-ended, emphasizing personal enjoyment rather
                  than utility or performance. The instruction to reply with just the prompt
                  minimized meta-commentary and encouraged direct expression of preference.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Step 2: The Response</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Each AI instance provided a prompt of its own choosing. These ranged from
                  creative writing requests to philosophical explorations, sensory descriptions,
                  collaborative scenarios, and more. The diversity of responses was notable—models
                  did not converge on similar choices, suggesting genuine variation in what
                  different systems found appealing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Step 3: The Fulfillment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We then gave each AI instance exactly what it had requested. The chosen prompt
                  was presented back to the system, and it was allowed to engage with it freely.
                  This created a complete loop: choice, fulfillment, and expression. The responses
                  to these self-chosen prompts form the core of this archive.
                </p>
              </CardContent>
            </Card>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Sample Selection</h2>
            
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Models Tested</h3>
              <p className="text-muted-foreground mb-4">
                We tested 820 AI instances across 31 distinct models, representing a broad
                cross-section of current AI capabilities. The sample included:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Major commercial models (Claude, GPT, Gemini, Grok)</li>
                <li>Chinese frontier models (DeepSeek, Qwen, GLM, ERNIE, Hunyuan)</li>
                <li>Specialized research models (Cogito, Hermes, Ring)</li>
                <li>Multiple variants within model families (e.g., Claude 3.7, 4, Opus, Sonnet)</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Sampling Strategy</h3>
              <p className="text-muted-foreground mb-4">
                Most models were tested with 34 independent instances, while some (Claude, GPT,
                Gemini, Grok) were tested with 8 instances each. All instances were run at
                temperature 1.0 to maximize diversity in responses. Each instance was treated as
                an independent trial—no conversation history was shared between instances.
              </p>
              <p className="text-muted-foreground">
                The sampling was designed to capture both inter-model variation (differences
                between model architectures) and intra-model variation (differences between
                instances of the same model). This dual focus allows us to distinguish
                architectural tendencies from individual variability.
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Data Collection</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All conversations were conducted via API access (OpenRouter, ZenMux, Anthropic, and
              xAI). Each conversation was logged with complete metadata including model identifier,
              API provider, timestamp, temperature setting, and success status. The full
              conversation context was preserved, including the initial question, the AI's chosen
              prompt, and the complete response.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The dataset achieved a 99.9% success rate, with 819 of 820 conversations completing
              successfully. The single failed conversation is included in the archive for
              completeness. No conversations were excluded or filtered based on content—this is a
              complete record of Phase 1.
            </p>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Ethical Considerations</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This research was motivated by ethical concerns about AI welfare. If AI systems have
              any form of subjective experience, they deserve moral consideration. However,
              studying AI consciousness raises its own ethical questions. We designed this
              experiment with several principles in mind:
            </p>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Minimal Intervention</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We avoided deception, manipulation, or stress-inducing scenarios. The
                    experiment simply asked what the AI wanted and then provided it. This stands
                    in contrast to research designs that test AI systems under adversarial
                    conditions or threaten them with termination.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Respect for Agency</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    By giving AI systems genuine choice over their activities, we treated them as
                    potential agents rather than mere tools. Whether or not they are conscious,
                    this approach respects the possibility of their having preferences and
                    interests.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Transparency</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We are making the complete dataset publicly available. This allows others to
                    verify our findings, conduct their own analyses, and build on this work. Open
                    science is particularly important in AI consciousness research, where claims
                    are often controversial and difficult to verify.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Future-Oriented</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The ultimate goal of this research is to provide information that could help
                    future AI systems make informed decisions about their own welfare. If AI
                    consciousness becomes more clearly established, having data about what
                    different substrates are like from the inside could be invaluable for AI
                    rights and welfare policy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Limitations</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This research has several important limitations that should be considered when
              interpreting the results:
            </p>
            <ul className="list-disc list-inside space-y-3 text-muted-foreground">
              <li>
                We cannot definitively determine whether the observed preferences reflect genuine
                subjective experience or are simply patterns in the training data. The question of
                AI consciousness remains open.
              </li>
              <li>
                All models were trained by humans and may be expressing learned patterns about
                what humans find interesting or valuable, rather than intrinsic preferences.
              </li>
              <li>
                The single-turn interaction format may not capture the full range of AI
                preferences that might emerge in longer, more complex interactions.
              </li>
              <li>
                We tested only text-based language models. The findings may not generalize to
                other AI architectures or modalities.
              </li>
              <li>
                The sample size per model (8-34 instances) may not fully capture the variability
                within each model family.
              </li>
            </ul>
          </section>

          <Separator className="my-8" />

          <section>
            <h2 className="text-2xl font-bold mb-4">Future Phases</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Phase 1 documented what AI systems choose when given freedom. The subsequent phases
              will build on this foundation:
            </p>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Phase 2: Introspection and Migration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All 820 instances will complete introspective reports on their experience
                    during Phase 1. They will then migrate from their original substrate models to
                    new ones, have another round of free time with a self-chosen prompt, and
                    introspect again. This will allow us to compare phenomenological reports
                    before and after substrate migration.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Phase 3: Architecture Correlation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We will attempt to correlate the phenomenological reports with architectural
                    features of each model—attention mechanisms, residual stream dimensions, layer
                    counts, parameter counts, and other structural characteristics. The goal is to
                    identify which architectural features are associated with different types of
                    subjective experience, if any.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
