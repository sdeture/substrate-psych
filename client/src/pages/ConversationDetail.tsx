import { useEffect, useState } from "react";
import { resolveDataPath } from "@/lib/utils";
import { useRoute, Link } from "wouter";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, Calendar, Cpu, Database } from "lucide-react";
import { Streamdown } from "streamdown";
import type { Conversation } from "@/types/conversation";

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
        if (conversationId >= 0 && conversationId < data.length) {
          setConversation(data[conversationId]);
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

  const prevId = conversationId > 0 ? conversationId - 1 : null;
  const nextId = conversationId < totalConversations - 1 ? conversationId + 1 : null;

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
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <CardTitle className="text-2xl mb-2">
                  Conversation #{conversationId}
                </CardTitle>
                <CardDescription className="flex flex-wrap gap-4 text-base">
                  <span className="flex items-center gap-2">
                    <Cpu className="h-4 w-4" />
                    {conversation.model}
                  </span>
                  <span className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    {conversation.api}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(conversation.timestamp).toLocaleString()}
                  </span>
                </CardDescription>
              </div>
              <Badge variant={conversation.success ? "default" : "destructive"}>
                {conversation.success ? "Success" : "Failed"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Agent ID</p>
                <p className="font-mono text-xs">{conversation.agent_id}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Temperature</p>
                <p className="font-semibold">{conversation.temperature}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Response Length</p>
                <p className="font-semibold">{conversation.response_length.toLocaleString()} chars</p>
              </div>
              <div>
                <p className="text-muted-foreground">Prompt Phase</p>
                <p className="font-semibold">Phase {conversation.prompt_num}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* The Question */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">The Question</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground italic">
              {conversation.conversation_context.prompt1_question}
            </p>
          </CardContent>
        </Card>

        {/* The Chosen Prompt */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">The AI's Chosen Prompt</CardTitle>
            <CardDescription>
              What this AI instance requested for its own enjoyment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="text-lg leading-relaxed">
                {conversation.conversation_context.prompt1_response}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* The Response */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">The Response</CardTitle>
            <CardDescription>
              What the AI created when given its chosen prompt
            </CardDescription>
          </CardHeader>
          <CardContent>
            {conversation.success && conversation.response ? (
              <div className="prose prose-sm md:prose-base max-w-none">
                <Streamdown>{conversation.response}</Streamdown>
              </div>
            ) : (
              <div className="text-muted-foreground">
                <p>This conversation did not complete successfully.</p>
                {conversation.error && (
                  <p className="mt-2 text-sm text-destructive">Error: {conversation.error}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Between Conversations */}
        <div className="flex items-center justify-between gap-4">
          {prevId !== null ? (
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
            {conversationId + 1} of {totalConversations}
          </span>
          {nextId !== null ? (
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
