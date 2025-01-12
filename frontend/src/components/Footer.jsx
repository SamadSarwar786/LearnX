
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1D2026] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h3 className="text-xl mb-4">LearnX</h3>
          <div className="flex gap-8 text-sm text-white/60">
            <a href="#" className="hover:text-white">
              Cources
            </a>
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms & Conditions
            </a>
          </div>
          <p className="text-sm text-white/60 mt-8">
            © {currentYear} Class Technologies Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
