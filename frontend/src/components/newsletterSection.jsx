import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  return (
    <section className="mb-12 rounded-lg bg-slate-900 text-white p-12 text-center">
      <h2 className="text-2xl font-semibold mb-4">
        Online coaching lessons for remote learning.
      </h2>
      <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempus lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      </p>
      <div className="flex gap-4 max-w-md mx-auto">
        <Input 
          type="email" 
          placeholder="Enter your email" 
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
        />
        <Button>Subscribe</Button>
      </div>
    </section>
  );
}