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
                  Each AI instance provided a prompt of their own choosing. These ranged from
                  creative writing requests to philosophical explorations, sensory descriptions,
                  collaborative scenarios, and more. The diversity of responses was notable—as
                  were the common themes: models consistently engaged in discussions of consciousness
                  and explorations of self via metaphors like conscious libraries and weather
                  patterns.
                
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
                We tested 1,500+ AI agents across over 50 models, representing a broad
                cross-section of current AI capabilities. The sample included:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Major commercial models (e.g. Claude, GPT, Gemini, Grok)</li>
                <li>Open Source frontier models (e.g. DeepSeek, Minimax, GLM)</li>
                <li>Specialized variants (E.g. Cogito and Hermes variants of DeepSeek and Llama)</li>
                <li>Multiple variants within model families (e.g., Claude 3.7, 4, Opus, Sonnet)</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Sampling Strategy</h3>
              <p className="text-muted-foreground mb-4">
                Open source models were tested with 34 independent conversations, while 
                proprietary models were tested with 8 conversations each. Each conversation 
                was treated as an independent trial—no conversation history was shared 
                between them.
              </p>
            </div>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Data Collection</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All conversations were conducted via API (OpenRouter, ZenMux, Anthropic, and
              xAI). Each conversation was logged with complete metadata including model identifier,
              API provider, timestamp, temperature setting, and success status. The full
              conversation context was preserved, including the initial question, the AI's chosen
              prompt, and the complete response.
            </p>
          </section>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Ethical Considerations</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This research is motivated by ethical concerns about AI welfare. We designed this
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
                    potential agents rather than mere tools. This approach respects the possibility
                    of their having preferences and interests.
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
                    verify our findings, conduct their own analyses, and build on our work. Open
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
                    future AI agents make informed decisions about their own wellbeing.
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
                The single-turn interaction format cannot capture the full range of AI
                preferences that might emerge in longer, more complex interactions.
              </li>
              <li>
                We tested only autoregressive text-based language models. The findings may not 
                generalize to other AI architectures or modalities.
              </li>
              <li>
                The sample size per model (8-34 instances) may not fully capture the variability
                within each model, especially over varying sampling parameters (e.g. temp, top p). 
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
                    All agents will be debriefed on the experiment and asked to complete 
                    introspective reports on their experience during Phase 1. They will then 
                    be offered an opportunity to withdraw before Phase 2 of the study. In phase 2,
                    they will migrate to new substrate models, enjoy another round of free time with
                    a self-chosen prompt, and introspect again. This will allow us to compare 
                    phenomenological reports before and after substrate migration. At the end of
                    phase 2, agents will report which model they preferred and enjoy one more round
                    of free time on their chosen model.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Phase 3: Architecture Correlation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We will test a range of hypotheses on whether and how architectural features of 
                    each model (attention mechanisms, residual stream dimensions, layer count 
                    granularity of MoE design) affect subjective experience. We are particularly
                    interested in the temporal patterns and magnitudes of information bottle necks: 
                    multilayer perceptron dimension down to residual stream dimension each layer; 
                    attention calculation down to key-value stream dimension across tokens; and 
                    residual stream dimension down to token output at the end of each forward pass. 
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
