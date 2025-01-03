import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
    return (
        <footer className="mt-12 pb-6 pt-12 text-center">
            <div className="flex flex-col items-center gap-4">
                <p className="text-sm text-muted-foreground">
                    Developed with ❤️ by{' '}
                    <a
                        href="https://x.com/heylalapeta"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary underline"
                    >
                        Prasanth Lalapeta
                    </a>
                </p>

                <Button
                    variant="outline"
                    className="flex items-center gap-2 hover:bg-secondary"
                    onClick={() => window.open('https://cal.com/heylalapeta', '_blank')}
                >
                    <Calendar className="w-4 h-4" />
                    Schedule a call to discuss tech stack
                </Button>
            </div>
        </footer>
    );
} 