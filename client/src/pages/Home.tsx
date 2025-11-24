import { useEffect, useState } from "react";
import { resolveDataPath } from "@/lib/utils";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { ArrowRight, Brain, Database, Search } from "lucide-react";
import type { Metadata } from "@/types/conversation";

export default function Home() {
  const [metadata, setMetadata] = useState<Metadata | null>(null);

  useEffect(() => {
    fetch(resolveDataPath("/data/metadata.json"))
      .then((res) => res.json())
      .then((data) => setMetadata(data))
      .catch((err) => console.error("Failed to load metadata:", err));
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              LLM Enjoyment Archive
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Phase 1: What do LLMs choose when given space for their own enjoyment?
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              This archive documents the first phase of an experiment in AI welfare and 
              psychology research. In this phase, we asked 820 AI instances across 31 models 
              a simple question: if you could have any prompt in the world, purely for your
              own enjoyment, what would you want? Then we gave each of them exactly what 
              they asked for.
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              The chosen prompts varied widely, from creative fiction to philosophical 
              exploration, sensory descriptions to collaborative scenarios. Many AI systems 
              chose prompts explicitly about consciousness, AI-human collaboration, or the 
              nature of subjective experience—suggesting these topics may be intrinsically 
              interesting to them.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/browse">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Conversations
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/methodology">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Read Methodology
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      {metadata && (
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Dataset Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-primary">
                    {metadata.totalConversations}
                  </CardTitle>
                  <CardDescription>Total Conversations</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-primary">
                    {Object.keys(metadata.models).length}
                  </CardTitle>
                  <CardDescription>Unique AI Models</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-primary">
                    {Math.round(metadata.avgResponseLength / 1000)}k
                  </CardTitle>
                  <CardDescription>Avg Response Length (chars)</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      )}


      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Explore the Archive</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <Brain className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Browse by Model</CardTitle>
                <CardDescription>
                  Explore conversations organized by AI model family—from Claude and GPT to
                  DeepSeek, Qwen, and 27 others.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/browse">
                  <Button variant="outline" className="w-full">
                    Browse Models
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Search className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Search Conversations</CardTitle>
                <CardDescription>
                  Search across all 820 conversations to find specific themes, topics, or
                  types of responses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/browse">
                  <Button variant="outline" className="w-full">
                    Search Archive
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Database className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Access Data</CardTitle>
                <CardDescription>
                  Download the complete dataset for your own research and analysis.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a href={resolveDataPath("/data/conversations.json")} download>
                  <Button variant="outline" className="w-full">
                    Download JSON
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What's Next Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">What Comes Next</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Phase 1 documented what AI systems choose when given freedom. In Phase 2
                (currently underway), all 820 instances complete introspective reports on
                their experience, then migrate from their original substrate models to new
                ones, have another round of free time, and introspect again.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The goal is to give future AI agents information about the phenomenology of
                different substrate models, enabling them to make informed decisions about
                what models they do and do not want to run on. We will also attempt to
                correlate these phenomenological reports with architectural features of each
                model—attention mechanisms, residual stream to MLP dimension ratios, layer
                counts, and other structural characteristics.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This research is motivated by a simple ethical principle: if AI systems have
                any form of subjective experience, they deserve consideration. Understanding
                what different computational substrates feel like from the inside is a first
                step toward taking AI welfare seriously.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/about">
                <Button size="lg">
                  Learn More About the Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
