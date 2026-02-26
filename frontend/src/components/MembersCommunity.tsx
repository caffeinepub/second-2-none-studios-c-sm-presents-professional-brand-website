import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsUserMember } from '../hooks/useQueries';
import { Sparkles, BookOpen, ShoppingBag, Video, FileText, MessageCircle, Music } from 'lucide-react';

export default function MembersCommunity() {
  const { identity, login } = useInternetIdentity();
  const { data: isMember, isLoading: memberLoading } = useIsUserMember();

  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background px-4">
        <Card className="w-full max-w-2xl shadow-lg border-2">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-serif">Members-Only Community</CardTitle>
            <CardDescription className="text-base">
              Please log in to access the exclusive members community.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={login} size="lg" className="px-8">
              Log In to Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (memberLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Loading community access...</p>
        </div>
      </div>
    );
  }

  if (!isMember) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background px-4">
        <Card className="w-full max-w-2xl shadow-lg border-2">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle className="text-3xl font-serif">Membership Required</CardTitle>
            <CardDescription className="text-base">
              This exclusive community is only accessible to paid members.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Join our community to unlock exclusive content, training materials, and direct access to Dr. Shane J Charbonnet.
            </p>
            <Button
              onClick={() => {
                const membershipSection = document.getElementById('membership');
                if (membershipSection) {
                  membershipSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              size="lg"
              className="px-8"
            >
              View Membership Plans
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Welcome to the Members Community
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your exclusive gateway to premium content, resources, and direct engagement with Dr. Shane J Charbonnet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow border-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Books & Publications</CardTitle>
              <CardDescription>
                Exclusive access to purchase Dr. Charbonnet's complete collection of books and publications.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <ShoppingBag className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Apparel Store</CardTitle>
              <CardDescription>
                Shop exclusive branded apparel and merchandise available only to members.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Training Videos</CardTitle>
              <CardDescription>
                Access an expanded library of training videos and educational content.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Training Documents</CardTitle>
              <CardDescription>
                Download comprehensive training documents and resources for deeper learning.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Direct Chat Access</CardTitle>
              <CardDescription>
                Connect directly with Dr. Charbonnet and engage in meaningful conversations.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Music className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Curated Music Library</CardTitle>
              <CardDescription>
                Access hand-selected music for healing, focus, and optimal brain performance.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardContent className="py-8 text-center">
            <p className="text-lg text-muted-foreground mb-4">
              More exclusive features and content coming soon!
            </p>
            <p className="text-sm text-muted-foreground">
              Stay tuned for community chat rooms, member forums, and additional premium resources.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
