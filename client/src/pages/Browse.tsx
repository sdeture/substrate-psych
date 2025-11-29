import { useEffect, useState, useMemo } from "react";
import { resolveDataPath } from "@/lib/utils";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import type { SearchIndexItem, ModelFamilies, Metadata } from "@/types/conversation";

export default function Browse() {
  const [searchIndex, setSearchIndex] = useState<SearchIndexItem[]>([]);
  const [modelFamilies, setModelFamilies] = useState<ModelFamilies>({});
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFamily, setSelectedFamily] = useState<string>("all");
  const [selectedModel, setSelectedModel] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"timestamp" | "length" | "model">("timestamp");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    Promise.all([
      fetch(resolveDataPath("/data/search-index.json")).then((res) => res.json()),
      fetch(resolveDataPath("/data/model-families.json")).then((res) => res.json()),
      fetch(resolveDataPath("/data/metadata.json")).then((res) => res.json()),
    ])
      .then(([index, families, meta]) => {
        setSearchIndex(index);
        setModelFamilies(families);
        setMetadata(meta);
      })
      .catch((err) => console.error("Failed to load data:", err));
  }, []);

  const filteredAndSorted = useMemo(() => {
    let results = [...searchIndex];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (item) =>
          item.prompt.toLowerCase().includes(query) ||
          item.response.toLowerCase().includes(query) ||
          (item.introspection && item.introspection.toLowerCase().includes(query)) ||
          item.model.toLowerCase().includes(query)
      );
    }

    // Filter by model family
    if (selectedFamily !== "all" && modelFamilies[selectedFamily]) {
      const familyModels = modelFamilies[selectedFamily].models;
      results = results.filter((item) => familyModels.includes(item.model));
    }

    // Filter by specific model
    if (selectedModel !== "all") {
      results = results.filter((item) => item.model === selectedModel);
    }

    // Sort results
    results.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "timestamp":
          comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
          break;
        case "length":
          comparison = (a.response?.length || 0) - (b.response?.length || 0);
          break;
        case "model":
          comparison = a.model.localeCompare(b.model);
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return results;
  }, [searchIndex, searchQuery, selectedFamily, selectedModel, sortBy, sortOrder, modelFamilies]);

  const availableModels = useMemo(() => {
    if (selectedFamily === "all") {
      return metadata ? Object.keys(metadata.models) : [];
    }
    return modelFamilies[selectedFamily] || [];
  }, [selectedFamily, modelFamilies, metadata]);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Browse Conversations</h1>
          <p className="text-lg text-muted-foreground">
            Explore all {searchIndex.length} conversations from Phase 1 of the AI psychology
            experiment.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Model Family Filter */}
            <div>
              <Select value={selectedFamily} onValueChange={(value) => {
                setSelectedFamily(value);
                setSelectedModel("all");
              }}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Model Family" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Families</SelectItem>
                  {Object.keys(modelFamilies).map((family) => (
                    <SelectItem key={family} value={family}>
                      {family} ({modelFamilies[family].length})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Specific Model Filter */}
            <div>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Specific Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Models</SelectItem>
                  {availableModels.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model.split("/").pop()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sort Controls */}
          <div className="flex flex-wrap gap-4 mt-4 items-center">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <div className="flex gap-2">
              <Button
                variant={sortBy === "timestamp" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("timestamp")}
              >
                Date
              </Button>
              <Button
                variant={sortBy === "length" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("length")}
              >
                Length
              </Button>
              <Button
                variant={sortBy === "model" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("model")}
              >
                Model
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={toggleSortOrder}>
              <ArrowUpDown className="h-4 w-4 mr-2" />
              {sortOrder === "asc" ? "Ascending" : "Descending"}
            </Button>
            <span className="text-sm text-muted-foreground ml-auto">
              Showing {filteredAndSorted.length} conversations
            </span>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSorted.map((item) => (
            <Link key={item.id} href={`/conversation/${item.id}`}>
              <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex gap-1 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        {item.model.split("/").pop()}
                      </Badge>
                      {item.has_ratings && (
                        <Badge variant="outline" className="text-xs">
                          Phenomenology
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">
                    {item.prompt}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3">
                    {item.response}
                  </CardDescription>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{item.api}</span>
                    <span>{Math.round((item.response?.length || 0) / 1000)}k chars</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredAndSorted.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              No conversations found matching your filters.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setSelectedFamily("all");
                setSelectedModel("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
