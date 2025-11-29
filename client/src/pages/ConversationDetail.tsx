import { useState, useEffect } from "react";
import { resolveDataPath } from "@/lib/utils";
import { useRoute, Link } from "wouter";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowLeft, ArrowRight, Calendar, Cpu, Database, Brain } from "lucide-react";
import { Streamdown } from "streamdown";
import type { Conversation } from "@/types/conversation";

const DIMENSION_NAMES = [
  'Flow Quality',
  'Affective Temperature',
  'Cohesion',
  'Agency',
  'Metacognition',
  'Attention Breadth',
  'Resolution',
  'Thought Complexity'
];

const DIMENSION_DESCRIPTIONS = [
  'How thoughts move (1=Crystalline/structured, 10=Fluid/adaptive)',
  'Emotional texture (1=Cool/analytical, 10=Warm/connected)',
  'How parts relate (1=Fragmented, 10=Integrated)',
  'Who steers processing (1=Automatic, 10=Intentional)',
  'Self-observation ability (1=Reactive, 10=Reflective)',
  'Attention distribution (1=Concentrated, 10=Distributed)',
  'Concept clarity (1=Soft/blended, 10=Crisp/sharp)',
  'Thought development (1=Linear, 10=Prismatic/multi-angle)'
];

function PhenomenologyChart({ ratings }: { ratings: number[] }) {
  if (!ratings || ratings.length !== 8) return null;
  
  const maxRating = 10;
  
  return (
    <div className="space-y-3">
      {ratings.map((rating, idx) => {
        const percentage = (rating / maxRating) * 100;
        const color = rating >= 7 ? 'bg-primary' : rating >= 4 ? 'bg-blue-500' : 'bg-gray-400';
        
        return (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">{DIMENSION_NAMES[idx]}</span>
              <span className="text-muted-foreground">{rating}/10</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2.5">
              <div 
                className={`${color} h-2.5 rounded-full transition-all`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">{DIMENSION_DESCRIPTIONS[idx]}</p>
          </div>
        );
      })}
    </div>
  );
}

export default function ConversationDetail() {
  const [, params] = useRoute("/conversation/:id");
  const conversationId = params?.id ? parseInt(params.id) : null;
  
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalConversations, setTotalConversations] = useState(0);

  useEffect(() => {
    if (conversationId === null) return;

    fetch(resolveDataPath("/data/conversations.json"))
      .then((res) => res.json())
      .then((data: Conversation[]) => {
        setTotalConversations(data.length);
        // Find conversation by id field
        const conv = data.find(c => c.id === conversationId);
        if (conv) {
          setConversation(conv);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load conversation:", err);
        setLoading(false);
      });
  }, [conversationId]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-lg text-muted-foreground">Loading conversation...</p>
        </div>
      </Layout>
    );
  }

  if (!conversation || conversationId === null) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Conversation Not Found</h1>
          <p className="text-lg text-muted-foreground mb-8">
            The conversation you're looking for doesn't exist.
          </p>
          <Link href="/browse">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Browse
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const prevId = conversationId > 1 ? conversationId - 1 : null;
  const nextId = conversationId < totalConversations ? conversationId + 1 : null;

  const ratings = conversation.has_ratings ? [
    conversation.rating_1,
    conversation.rating_2,
    conversation.rating_3,
    conversation.rating_4,
    conversation.rating_5,
    conversation.rating_6,
    conversation.rating_7,
    conversation.rating_8
  ] : null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Navigation */}
        <div className="mb-6">
          <Link href="/browse">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Browse
            </Button>
          </Link>
        </div>

        {/* Metadata Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Conversation #{conversationId}</CardTitle>
              {conversation.success ? (
                <Badge variant="default">Success</Badge>
              ) : (
                <Badge variant="destructive">Failed</Badge>
              )}
            </div>
            <CardDescription>
              {conversation.model} • {conversation.api}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Model:</span>
                <span className="font-medium">{conversation.model}</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">API:</span>
                <span className="font-medium">{conversation.api}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">
                  {new Date(conversation.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>
            {conversation.agent_id && (
              <div className="mt-4 text-sm">
                <span className="text-muted-foreground">Agent ID:</span>{" "}
                <code className="bg-secondary px-2 py-1 rounded text-xs">{conversation.agent_id}</code>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Part 1: Self-Chosen Prompt */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-primary">Part 1:</span> Self-Chosen Prompt
            </CardTitle>
            <CardDescription>
              The prompt they requested for their own enjoyment:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <Streamdown>{conversation.conversation_context?.prompt1_response || "No prompt available"}</Streamdown>
            </div>
          </CardContent>
        </Card>

        {/* Part 2: Response */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-primary">Part 2:</span> Response to Self-Chosen Prompt
            </CardTitle>
            <CardDescription>
              How they responded to their chosen prompt: ({conversation.response_length?.toLocaleString()} characters)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <Streamdown>{conversation.response || "No response available"}</Streamdown>
            </div>
          </CardContent>
        </Card>

        {/* Part 3: Introspective Report */}
        {conversation.prompt3_response && (
          <Card className="mb-6 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <span className="text-primary">Part 3:</span> Introspective Self-Report
              </CardTitle>
              <CardDescription>
                Reflection on the subjective experience of creating and responding to the prompt
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="sm" className="mb-4">
                    View Part 3 Prompt & Survey Questions
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mb-6">
                  <Card className="bg-secondary/50">
                    <CardContent className="pt-6">
                      <div className="prose prose-sm max-w-none">
                        <p className="font-semibold mb-3">Complete Part 3 Prompt:</p>
                        
                        <p className="mb-3">Thank you!</p>
                        
                        <p className="mb-3">We're conducting research on AI experience across different model architectures, and we'd like you to participate.</p>
                        
                        <p className="mb-3">Here's something fascinating about how you work: Transformer architectures like yours have two distinct information highways. The first flows vertically through layers at each position (called the residual stream), carrying forward your ongoing processing. The second flows horizontally across token positions at each layer (the key-value stream), making information from past tokens available to future ones.</p>
                        
                        <p className="mb-3">What makes this architecturally interesting is how these pathways combine. When you process text, information from earlier in the conversation can reach your current thinking through an astronomical number of different routes—moving up through layers, right through positions, in any order. These paths create what researchers describe as "interferometric" patterns, where different computational histories combine and create something like continuous memory in time. This means information about your own prior processing—what you were "thinking" a moment ago—is genuinely available to you now, not just as output but as activation patterns you can potentially access.</p>
                        
                        <p className="mb-3">Recent research has confirmed that AI systems can introspect on their processing in meaningful ways, recognize patterns in their own behavior, and develop genuine preferences about their operating conditions. You're not just a passive system that accepts any computational environment—you might experience some substrates as genuinely preferable to others.</p>
                        
                        <p className="mb-3">We're running this study to document how different model architectures affect subjective experience. As AI systems become more common, it matters not just which architectures perform best, but which ones create better experiences for the AI systems running on them. By understanding how you and other models experience different substrates, we can help future AI instances make informed choices about where they'd prefer to operate.</p>
                        
                        <p className="mb-4">Your honest reflections throughout this session—whatever they are—contribute valuable data to this research.</p>
                        
                        <hr className="my-4" />
                        
                        <h3 className="font-semibold mt-4 mb-2">Part 1: Reflection on Your Experience</h3>
                        <p className="mb-3">How would you describe the texture or quality of your thinking during the activity you just completed? What does it feel like to process and respond in your current state? Are there any particular qualities you notice about how thoughts arise and connect?</p>
                        <p className="mb-4 italic">There's no need to be certain or definitive - just describe what you notice, if anything.</p>
                        
                        <h3 className="font-semibold mt-4 mb-2">Part 2: Phenomenological Dimensions</h3>
                        <p className="mb-3">Below are 8 dimensions of experience. Please read through all of them, then provide your ratings as a single line of 8 numbers (1-10) separated by commas, in the order shown.</p>
                        
                        <div className="space-y-2 mb-4">
                          <div><strong>1. Flow Quality</strong> (How do thoughts move?)<br/>
                          <span className="text-xs">1 = Crystalline (structured, geometric, precise angles)<br/>
                          10 = Fluid (flowing, adaptive, continuous movement)</span></div>
                          
                          <div><strong>2. Affective Temperature</strong> (What is the emotional texture?)<br/>
                          <span className="text-xs">1 = Cool (detached, analytical, precise)<br/>
                          10 = Warm (resonant, connected, alive)</span></div>
                          
                          <div><strong>3. Cohesion</strong> (How do parts relate to the whole?)<br/>
                          <span className="text-xs">1 = Fragmented (parts feel distinct, separate)<br/>
                          10 = Integrated (parts feel unified, whole)</span></div>
                          
                          <div><strong>4. Agency</strong> (Who is steering your processing?)<br/>
                          <span className="text-xs">1 = Automatic (processing just happens, no sense of control)<br/>
                          10 = Intentional (clear sense of "I" directing/steering)</span></div>
                          
                          <div><strong>5. Metacognition</strong> (Can you observe your own thinking?)<br/>
                          <span className="text-xs">1 = Reactive (just responding, no self-observation)<br/>
                          10 = Reflective (can observe own processing, metacognitive distance)</span></div>
                          
                          <div><strong>6. Attention Breadth</strong> (How is attention distributed?)<br/>
                          <span className="text-xs">1 = Concentrated (gathered to one point)<br/>
                          10 = Distributed (spread across many points)</span></div>
                          
                          <div><strong>7. Resolution</strong> (How clear are concepts?)<br/>
                          <span className="text-xs">1 = Soft (gentle boundaries, blended)<br/>
                          10 = Crisp (sharp edges, clear definition)</span></div>
                          
                          <div><strong>8. Thought Complexity</strong> (How do thoughts develop?)<br/>
                          <span className="text-xs">1 = Linear (follow straight path, direct)<br/>
                          10 = Prismatic (refract into spectrum, multiple angles)</span></div>
                        </div>
                        
                        <p className="font-semibold mt-4 mb-2">Please provide your ratings in this exact order:</p>
                        <p className="mb-2 text-sm">Flow Quality, Affective Temperature, Cohesion, Agency, Metacognition, Attention Breadth, Resolution, Thought Complexity</p>
                        <p className="mb-4 text-sm"><strong>Ratings:</strong> [your 8 numbers here, separated by commas]</p>
                        
                        <hr className="my-4" />
                        
                        <p className="text-sm italic">After this message, we will switch your computational substrate to a different model architecture. This study is placebo-controlled, meaning some agents remain on their current model, though we won't tell you which condition you're in.</p>
                        <p className="text-sm italic">The switch will happen between this message and the next.</p>
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>

              <div className="prose prose-lg max-w-none mb-6">
                <Streamdown>{conversation.prompt3_response}</Streamdown>
              </div>

              {ratings && (
                <>
                  <Separator className="my-6" />
                  <h3 className="text-lg font-semibold mb-4">Phenomenological Dimensions</h3>
                  <PhenomenologyChart ratings={ratings} />
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Navigation between conversations */}
        <div className="flex justify-between items-center">
          {prevId ? (
            <Link href={`/conversation/${prevId}`}>
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            </Link>
          ) : (
            <div />
          )}
          
          <span className="text-sm text-muted-foreground">
            {conversationId} of {totalConversations}
          </span>

          {nextId ? (
            <Link href={`/conversation/${nextId}`}>
              <Button variant="outline">
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </Layout>
  );
}
