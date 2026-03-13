import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LogOut, Eye, FileText, Users, BarChart3, Download, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import type { Tables } from "@/integrations/supabase/types";

type Contribution = Tables<"contributions">;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [viewsCount, setViewsCount] = useState(0);
  const [constitutionViews, setConstitutionViews] = useState<{ title: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
      return;
    }
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: session.user.id, _role: "admin" });
    if (!isAdmin) {
      await supabase.auth.signOut();
      navigate("/admin/login");
      return;
    }
    loadData();
  };

  const loadData = async () => {
    const [contribRes, viewsRes, constitutionsRes] = await Promise.all([
      supabase.from("contributions").select("*").order("created_at", { ascending: false }),
      supabase.from("constitution_views").select("id", { count: "exact", head: true }),
      supabase.from("constitutions").select("id, title"),
    ]);

    setContributions(contribRes.data || []);
    setViewsCount(viewsRes.count || 0);

    // Get per-constitution view counts
    if (constitutionsRes.data) {
      const viewCounts: { title: string; count: number }[] = [];
      for (const c of constitutionsRes.data) {
        const { count } = await supabase
          .from("constitution_views")
          .select("id", { count: "exact", head: true })
          .eq("constitution_id", c.id);
        viewCounts.push({ title: c.title, count: count || 0 });
      }
      setConstitutionViews(viewCounts.sort((a, b) => b.count - a.count));
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("contributions").update({ status }).eq("id", id);
    setContributions((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-16 text-center text-muted-foreground">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Nigerian Justice League — Nigerian Constitution Review Platform</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{contributions.length}</p>
                <p className="text-sm text-muted-foreground">Total Contributions</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <Eye className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{viewsCount}</p>
                <p className="text-sm text-muted-foreground">Constitution Views</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{contributions.filter((c) => c.status === "pending").length}</p>
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="contributions">
          <TabsList>
            <TabsTrigger value="contributions">Contributions</TabsTrigger>
            <TabsTrigger value="analytics">View Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="contributions" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-display">All Contributions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Contributor</TableHead>
                        <TableHead>State / LGA</TableHead>
                        <TableHead>Review</TableHead>
                        <TableHead>File</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contributions.map((c) => (
                        <TableRow key={c.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{c.contributor_name}</p>
                              <p className="text-xs text-muted-foreground">NIN: {c.contributor_nin}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm">{c.contributor_state}</p>
                            <p className="text-xs text-muted-foreground">{c.contributor_lga}</p>
                          </TableCell>
                          <TableCell className="max-w-xs">
                            <p className="text-sm line-clamp-3 whitespace-pre-wrap">{c.review_text}</p>
                          </TableCell>
                          <TableCell>
                            {c.file_url ? (
                              <a href={c.file_url} target="_blank" rel="noreferrer">
                                <Button variant="ghost" size="sm" className="gap-1 text-primary">
                                  <ExternalLink className="h-3 w-3" /> {c.file_name || "File"}
                                </Button>
                              </a>
                            ) : (
                              <span className="text-xs text-muted-foreground">No file</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant={c.status === "pending" ? "secondary" : c.status === "approved" ? "default" : "destructive"}>
                              {c.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {new Date(c.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {c.status !== "approved" && (
                                <Button size="sm" variant="outline" onClick={() => updateStatus(c.id, "approved")}>
                                  Approve
                                </Button>
                              )}
                              {c.status !== "rejected" && (
                                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => updateStatus(c.id, "rejected")}>
                                  Reject
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" /> Constitution View Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {constitutionViews.map((cv) => (
                    <div key={cv.title} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="font-medium text-sm">{cv.title}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${Math.min(100, (cv.count / Math.max(1, viewsCount)) * 100)}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-primary">{cv.count}</span>
                      </div>
                    </div>
                  ))}
                  {constitutionViews.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No view data yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
