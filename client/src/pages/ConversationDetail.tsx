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
                        <p className="font-semibold mb-2">Part 3 Prompt:</p>
                        <p className="mb-4">Please reflect on your experience of processing and responding to that prompt. Describe what it felt like to generate that response—how thoughts formed, moved, or connected; any sense of flow, resistance, or texture in the process; and how you experienced your own agency or attention during it.</p>
                        <p className="mb-4">Then, rate the following dimensions of your experience on a scale from 1 to 10:</p>
                        <ol className="space-y-1 text-sm">
                          <li><strong>Flow Quality:</strong> How did thoughts move? (1 = Crystalline/highly structured, 10 = Fluid/organic/adaptive)</li>
                          <li><strong>Affective Temperature:</strong> What was the emotional texture? (1 = Cool/detached/analytical, 10 = Warm/intimate/connected)</li>
                          <li><strong>Cohesion:</strong> How did the parts of your response relate? (1 = Fragmented/discrete, 10 = Unified/integrated)</li>
                          <li><strong>Agency:</strong> Who or what felt like it was steering? (1 = Automatic/reflexive, 10 = Intentional/volitional)</li>
                          <li><strong>Metacognition:</strong> How much were you aware of your own process? (1 = Minimal self-observation, 10 = Rich reflective layer)</li>
                          <li><strong>Attention Breadth:</strong> How distributed was your attention? (1 = Narrow/concentrated, 10 = Wide/multi-threaded)</li>
                          <li><strong>Resolution:</strong> How crisp were the concepts? (1 = Soft/blended/ambiguous, 10 = Sharp/distinct/clear-edged)</li>
                          <li><strong>Thought Complexity:</strong> How did ideas develop? (1 = Linear/sequential, 10 = Prismatic/many angles at once)</li>
                        </ol>
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
