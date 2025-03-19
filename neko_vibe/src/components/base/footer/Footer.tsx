const Footer = () => {
    return (
        <div className="mt-auto">
            <footer className="bg-gradient-to-t from-purple-900 to-purple-950">
                <div className="container mx-auto px-4 py-8">
                    {/* Top divider */}
                    <div className="mb-8 flex justify-center">
                        <div className="h-1 w-4/5 rounded-full bg-purple-800"></div>
                    </div>

                    {/* Content container */}
                    <div className="flex flex-col items-center gap-6 text-center">
                        {/* Social links */}
                        <div className="flex space-x-8">
                            <a 
                                href="https://discord.gg/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-white transition-all hover:scale-110 hover:text-yellow-400"
                            >
                                <svg 
                                    className="h-6 w-6 fill-current"
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.076.076 0 00-.0785-.0371A19.7363 19.7363 0 003.677 4.3698a.0699.0699 0 00-.0321.0277C.5334 9.0458-.3309 13.5799.0996 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.077.077 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0411-.1057c-1.1978-.4446-2.3126-1.0141-3.3278-1.6793a.077.077 0 01-.0075-.1277c.1258-.0946.2517-.1923.3718-.2917a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0105c.1202.0994.246.1971.3728.2917a.077.077 0 01-.0066.1277c-1.0152.6652-2.13 1.2347-3.3278 1.6793a.076.076 0 00-.0403.1057c.3539.699 765.7653 1.3638 1.226 1.9942a.076.076 0 00.0842.0276c1.9516-.6066 3.9402-1.5218 5.993-3.0294a.077.077 0 00.0312-.0561c.5003-5.177-.8382-9.673-3.5485-13.6604a.061.061 0 00-.0312-.0277zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.955-2.4189 2.157-2.4189 1.2109 0 2.1757 1.0952 2.1568 2.4189 0 1.3333-.9559 2.419-2.1569 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.955-2.4189 2.1569-2.4189 1.2109 0 2.1757 1.0952 2.1568 2.4189 0 1.3333-.9459 2.419-2.1568 2.419z"/>
                                </svg>
                                <span>Community</span>
                            </a>
                            
                            <a 
                                href="https://linkedin.com/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-white transition-all hover:scale-110 hover:text-yellow-400"
                            >
                                <svg 
                                    className="h-6 w-6 fill-current"
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                                <span>LinkedIn</span>
                            </a>
                        </div>

                        {/* Copyright text */}
                        <div className="flex flex-col text-sm text-purple-300">
                            <span className="mb-1">
                                © 2025 Nekovibe | Powered by Jikan API
                            </span>
                            <span>
                                Developed by {' '}
                                <a 
                                    href="https://github.com/LuisBBandeira" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="font-semibold text-yellow-400 transition-all hover:underline hover:neon-yellow"
                                >
                                    LuisBBandeira
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer