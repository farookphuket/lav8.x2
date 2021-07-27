<h1 class="mt-4">Dashboard</h1>
<ol class="breadcrumb mb-4">
    <li class="breadcrumb-item active">Dashboard</li>
</ol>
<div class="row">
    <div class="col-xl-6 col-md-6">
        <div class="card bg-primary text-white mb-4">
            <div class="card-body">User</div>
            <div class="card-footer d-flex align-items-center 
                justify-content-between">
                @if(!$last_user->isEmpty())
                    <ul class="mb-4">
                    @foreach($last_user as $item)
                        <li>
                        {{$item->name}} {{$item->created_at->diffForHumans()}}
                        </li>
                    @endforeach
                    </ul>
                    <p class="pt-2 mb-2">&nbsp;</p>          
                @endif
                
                <a class="pt-4 small text-white stretched-link" 
                    href="{{route('admin.user.index')}}">View Details</a>
                <div class="small text-white">
                    <i class="fas fa-angle-right"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-6 col-md-6">
        <div class="card bg-warning text-white mb-4">
            <div class="card-body">Contact </div>
            <div class="card-footer d-flex align-items-center 
                justify-content-between">
                @if(!$last_contact->isEmpty())
                    
                    <ul>
                    @foreach($last_contact as $item)
                        <li>
                            {{$item->title}} {{$item->replied_at}}
                        </li>
                    @endforeach

                    </ul>
                    <p class="pt-2 mb-2">&nbsp;</p>
                @endif
                <a class="small text-white stretched-link" href="#">View Details</a>
                <div class="small text-white"><i class="fas fa-angle-right"></i></div>
            </div>
        </div>
    </div>
    <div class="col-xl-6 col-md-6">
        <div class="card bg-success text-white mb-4">
            <div class="card-body">Blogs</div>
            <div class="card-footer d-flex align-items-center justify-content-between">

                @if(!$last_blog->isEmpty())
                    <ul>
                    @foreach($last_blog as $item)
                        <li>
                        {{$item->title}} 
                            <span>
                                <b-icon icon="calendar-day"></b-icon>
                                {{$item->created_at->diffForHumans()}}
                            </span>
                        </li>
                    @endforeach
                    </ul>
                @endif
                <a class="small text-white stretched-link" href="{{route('admin.blog.index')}}">View Details</a>
                <div class="small text-white"><i class="fas fa-angle-right"></i></div>
            </div>
        </div>
    </div>
    <div class="col-xl-6 col-md-6">
        <div class="card bg-danger text-white mb-4">
            <div class="card-body">Last comment</div>
            <div class="card-footer d-flex align-items-center justify-content-between">
               @if(!$last_comment->isEmpty()) 
                <ul>
                    @foreach($last_comment as $item)
                        <li>
                            <div class="row">
                                <div class="col-md-6">
                                    {{$item->comment_title}}
                                </div>
                                <div class="col-md-3">
                                    {{$item->created_at}}
                                     &middot; 
                                    {{\Carbon\Carbon::parse(
                                        $item->created_at)
                                        ->diffForHumans()}}
                                </div>
                                <div class="col-md-3">
                                    {{$item->user->name}}
                                </div>
                            </div>
                            
                        </li>
                    @endforeach
                </ul>
                @endif

                <a class="small text-white stretched-link" href="#">View Details</a>
                <div class="small text-white"><i class="fas fa-angle-right"></i></div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-xl-6">
        <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-chart-area mr-1"></i>
                Area Chart Example
            </div>
            <div class="card-body"><canvas id="myAreaChart" width="100%" height="40"></canvas></div>
        </div>
    </div>
    <div class="col-xl-6">
        <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-chart-bar mr-1"></i>
                Bar Chart Example
            </div>
            <div class="card-body"><canvas id="myBarChart" width="100%" height="40"></canvas></div>
        </div>
    </div>
</div>
